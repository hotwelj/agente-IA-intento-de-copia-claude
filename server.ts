import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { z } from "zod";

dotenv.config();

// -------------------------------------------------------------
// 7. Environment Variables Validation at Startup
// -------------------------------------------------------------
function validateEnv() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.error("❌ ERROR CRÍTICO AL ARRANCAR EL SERVIDOR:");
    console.error("   GEMINI_API_KEY no está configurada o contiene el valor por defecto.");
    console.error("   Asegúrate de definir GEMINI_API_KEY en las variables de entorno.");
    process.exit(1);
  }
  console.log("✅ Configuración de variables de entorno validada correctamente.");
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "10mb" }));

// -------------------------------------------------------------
// 6. Structured Logging & Observability Helper
// -------------------------------------------------------------
interface LogMetadata {
  endpoint: string;
  durationMs: number;
  status: "success" | "error";
  tokensUsed?: {
    promptTokens?: number;
    responseTokens?: number;
    totalTokens?: number;
  };
  error?: string;
  ip?: string;
  details?: Record<string, any>;
}

function logStructured(logData: LogMetadata) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      ...logData,
    })
  );
}

// -------------------------------------------------------------
// 5. Rate Limiting & Basic Auth Middleware
// -------------------------------------------------------------
const rateLimitMax = process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : 100;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min window
  max: rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Demasiadas peticiones desde esta dirección IP. Por favor reintenta en 15 minutos.",
  },
});

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const expectedApiKey = (process.env.APP_API_KEY || process.env.VITE_APP_API_KEY || "").trim();

  // Optional app auth key: if not set or empty in environment, allow request
  if (!expectedApiKey || expectedApiKey === "" || expectedApiKey === "MY_APP_API_KEY") {
    return next();
  }

  const providedKey = (req.headers["x-api-key"] as string) || (req.headers["X-API-KEY"] as string) || (req.query.apiKey as string);

  if (providedKey === expectedApiKey) {
    return next();
  }

  // Allow /api/gemini/search from preview iframe and client templates
  if (req.path === "/api/gemini/search") {
    return next();
  }

  logStructured({
    endpoint: req.path,
    durationMs: 0,
    status: "error",
    error: "401 Unauthorized - Header x-api-key inválido o ausente",
    ip: req.ip,
  });

  return res.status(401).json({
    error: "Acceso no autorizado. Se requiere un header 'x-api-key' válido.",
  });
};

// -------------------------------------------------------------
// Gemini Client & FinishReason Checker
// -------------------------------------------------------------
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY no está configurada.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// 3. Safety and Finish Reason Checker
function checkFinishReason(response: any) {
  const candidate = response.candidates?.[0];
  if (!candidate) {
    throw new Error("El modelo de IA no devolvió ningún candidato de respuesta.");
  }

  const finishReason = candidate.finishReason;
  if (finishReason && finishReason !== "STOP") {
    console.error(`⚠️ FinishReason no estándar detectado: ${finishReason}`);
    if (finishReason === "SAFETY") {
      throw new Error("La generación fue bloqueada por los filtros de seguridad (SAFETY). Modifica la consulta.");
    } else if (finishReason === "MAX_TOKENS") {
      throw new Error("La respuesta excedió el límite máximo de tokens alcanzable.");
    } else if (finishReason === "RECITATION") {
      throw new Error("La generación fue bloqueada por citas repetitivas o derechos de autor (RECITATION).");
    } else {
      throw new Error(`Generación interrumpida por el modelo. Motivo: ${finishReason}`);
    }
  }
  return candidate;
}

// 2. JSON Validation & Automatic Retry Engine (up to 2 retries)
async function generateValidatedJson<T>(
  ai: GoogleGenAI,
  params: {
    model: string;
    contents: string;
    config?: any;
  },
  schema: z.ZodSchema<T>,
  endpointName: string
): Promise<{ data: T; usageMetadata?: any }> {
  let attempts = 0;
  const maxRetries = 2;
  let currentPrompt = params.contents;
  let lastError = "";

  const mergedConfig = {
    thinkingConfig: { thinkingBudget: 0 },
    ...(params.config || {}),
    responseMimeType: "application/json",
  };

  while (attempts <= maxRetries) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: params.model,
        contents: currentPrompt,
        config: mergedConfig,
      });

      checkFinishReason(response);

      let rawText = (response.text || "").trim();

      // Clean markdown code blocks if the model wrapped the JSON
      if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?\s*```$/i, "").trim();
      }

      let parsedObj: any;
      try {
        parsedObj = JSON.parse(rawText);
      } catch (jsonErr: any) {
        throw new Error(`JSON SyntaxError: ${jsonErr.message}. Texto recibido: ${rawText.slice(0, 100)}...`);
      }

      const validationResult = schema.safeParse(parsedObj);
      if (!validationResult.success) {
        const issues = validationResult.error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join("; ");
        throw new Error(`Zod ValidationError: ${issues}`);
      }

      return {
        data: validationResult.data,
        usageMetadata: response.usageMetadata,
      };
    } catch (err: any) {
      lastError = err.message || String(err);
      console.warn(
        `[${endpointName}] Intento ${attempts}/${maxRetries + 1} falló en validación JSON/FinishReason: ${lastError}`
      );

      if (attempts > maxRetries) {
        throw new Error(
          `Error persistente en formateo JSON tras ${maxRetries + 1} intentos: ${lastError}`
        );
      }

      // Retry prompt feeding back the specific error
      currentPrompt = `${params.contents}\n\n[ATENCIÓN: Tu intento anterior falló con el siguiente error de validación JSON: "${lastError}". Por favor re-genera la respuesta corrigiendo este error exacto y asegúrate de cumplir la estructura JSON válida esperada.]`;
    }
  }

  throw new Error(`Error en validación JSON para ${endpointName}`);
}

// 4. Server-Side In-Memory File Store for Incremental Refinements
interface StoredWebFile {
  path: string;
  language: string;
  content: string;
}

interface StoredWebsite {
  id: string;
  title: string;
  tagline: string;
  category: string;
  hasRealtimeSearch: boolean;
  stepLog: any[];
  designSystem: any;
  searchConfig?: any;
  files: StoredWebFile[];
  createdAt: string;
  promptUsed: string;
}

const websiteStore = new Map<string, StoredWebsite>();

function assemblePreviewHtml(files: StoredWebFile[], title: string): string {
  const indexFile = files.find((f) => f.path === "index.html" || f.path.endsWith(".html"));
  const cssFile = files.find((f) => f.path === "styles.css" || f.path.endsWith(".css"));
  const jsFile = files.find((f) => f.path === "app.js" || f.path.endsWith(".js"));

  let baseHtml = indexFile ? indexFile.content : "<!DOCTYPE html><html><head></head><body></body></html>";

  // Inject API key helper script for client fetches inside iframe
  const apiKey = process.env.VITE_APP_API_KEY || process.env.APP_API_KEY || "";
  const apiKeyScript = `\n<script>window.VITE_APP_API_KEY = "${apiKey}"; window.APP_API_KEY = "${apiKey}";</script>\n`;
  if (baseHtml.includes("</head>")) {
    baseHtml = baseHtml.replace("</head>", `${apiKeyScript}</head>`);
  } else {
    baseHtml = apiKeyScript + baseHtml;
  }

  // Inject CSS if styles.css exists and isn't already linked inline
  if (cssFile && cssFile.content) {
    if (!baseHtml.includes("<style>") && !baseHtml.includes(cssFile.content.slice(0, 30))) {
      const styleTag = `\n<style>\n${cssFile.content}\n</style>\n`;
      if (baseHtml.includes("</head>")) {
        baseHtml = baseHtml.replace("</head>", `${styleTag}</head>`);
      } else {
        baseHtml = styleTag + baseHtml;
      }
    }
  }

  // Inject JS if app.js exists and isn't already included
  if (jsFile && jsFile.content) {
    if (!baseHtml.includes("<script>") && !baseHtml.includes(jsFile.content.slice(0, 30))) {
      const scriptTag = `\n<script>\n${jsFile.content}\n</script>\n`;
      if (baseHtml.includes("</body>")) {
        baseHtml = baseHtml.replace("</body>", `${scriptTag}</body>`);
      } else {
        baseHtml = baseHtml + scriptTag;
      }
    }
  }

  return baseHtml;
}

// -------------------------------------------------------------
// Zod Schemas for Validation
// -------------------------------------------------------------
const SearchResponseSchema = z.object({
  text: z.string(),
});

const DevStepSchema = z.object({
  step: z.number().optional().default(1),
  title: z.string().optional().default("Paso de desarrollo"),
  detail: z.string().optional().default("Detalle del proceso"),
  status: z.string().optional().default("done"),
});

const DesignSystemSchema = z.object({
  primaryColor: z.string().optional().default("#0284c7"),
  backgroundColor: z.string().optional().default("#0f172a"),
  fontHeader: z.string().optional().default("sans-serif"),
  fontBody: z.string().optional().default("sans-serif"),
  spacingRatio: z.string().optional().default("1.25"),
  antiSlopRulesApplied: z.array(z.string()).optional().default([]),
});

const SearchConfigSchema = z
  .object({
    defaultQuery: z.string().optional().default("Noticias"),
    placeholder: z.string().optional().default("Buscar..."),
    searchType: z.string().optional().default("general"),
  })
  .optional()
  .nullable();

const WebFileSchema = z.object({
  path: z.string(),
  language: z.string().optional().default("javascript"),
  content: z.string(),
});

const WebsiteStructureSchema = z.object({
  title: z.string().optional().default("Sitio Web Generado"),
  tagline: z.string().optional().default("Generado con Inteligencia Artificial"),
  category: z.string().optional().default("landing"),
  hasRealtimeSearch: z.boolean().optional().default(false),
  stepLog: z.array(DevStepSchema).optional().default([]),
  designSystem: DesignSystemSchema.optional().default({
    primaryColor: "#0284c7",
    backgroundColor: "#0f172a",
    fontHeader: "sans-serif",
    fontBody: "sans-serif",
    spacingRatio: "1.25",
    antiSlopRulesApplied: [],
  }),
  searchConfig: SearchConfigSchema,
  files: z.array(WebFileSchema),
});

const RefinePatchSchema = z.object({
  explanation: z.string().optional().default("Cambios aplicados correctamente."),
  updatedFiles: z.array(WebFileSchema),
});

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiKeyPresent: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
  });
});

// 1. Real-time Google Search AI Endpoint
app.post("/api/gemini/search", apiLimiter, authMiddleware, async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { query, category = "general", context = "" } = req.body;

    if (!query || typeof query !== "string") {
      logStructured({
        endpoint: "/api/gemini/search",
        durationMs: Date.now() - startTime,
        status: "error",
        error: "Parámetro 'query' inválido",
        ip: req.ip,
      });
      return res.status(400).json({ error: "Se requiere un parámetro 'query' válido." });
    }

    const ai = getGeminiClient();

    const searchPrompt = `Responde a la siguiente consulta con información actualizada y precisa de internet:
Consulta: "${query}"
${context ? `Contexto adicional: "${context}"` : ""}

DIRECTRICES DE REDACCIÓN (HUMANA, CLARA Y CONCISA):
1. Escribe con un tono natural, conversacional y directo, como si fueras un periodista o experto humano explicando el tema en un lenguaje sencillo.
2. CERO MULETILLAS NI CLICHÉS DE IA: Prohibido iniciar con "¡Claro!", "Por supuesto", "Como IA", "A continuación te muestro", "En resumen", o "Es importante destacar". Ve directamente a la información principal.
3. ESTILO FLUIDO: Escribe en 1 o 2 párrafos cortos y ordenados. EVITA listas con viñetas interminables o excesos de negritas en cada palabra salvo que el usuario pida explícitamente una lista de datos.
4. Tono fresco, conciso y fácil de leer.`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: searchPrompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.3,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
    } catch (searchToolErr: any) {
      console.warn("⚠️ Google Search tool error, falling back to gemini-3.6-flash standard synthesis:", searchToolErr?.message);
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: searchPrompt,
        config: {
          temperature: 0.3,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
    }

    checkFinishReason(response);

    const text = response.text || "No se obtuvieron resultados de búsqueda.";
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    const citations = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) {
          return {
            title: chunk.web.title || "Fuente Web",
            url: chunk.web.uri || "#",
          };
        }
        return null;
      })
      .filter(Boolean);

    logStructured({
      endpoint: "/api/gemini/search",
      durationMs: Date.now() - startTime,
      status: "success",
      tokensUsed: {
        promptTokens: response.usageMetadata?.promptTokenCount,
        responseTokens: response.usageMetadata?.candidatesTokenCount,
        totalTokens: response.usageMetadata?.totalTokenCount,
      },
      ip: req.ip,
    });

    res.json({
      text,
      citations,
      searchQueries: webSearchQueries,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    logStructured({
      endpoint: "/api/gemini/search",
      durationMs: Date.now() - startTime,
      status: "error",
      error: err.message || String(err),
      ip: req.ip,
    });
    res.status(500).json({
      error: "Error ejecutando búsqueda en tiempo real con Google AI.",
      details: err.message || String(err),
    });
  }
});

// 1 & 2. Generate Website Endpoint with Modular File Generation and Schema Retry
app.post("/api/generate-website", apiLimiter, authMiddleware, async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { prompt, options } = req.body;

    if (!prompt || typeof prompt !== "string") {
      logStructured({
        endpoint: "/api/generate-website",
        durationMs: Date.now() - startTime,
        status: "error",
        error: "Prompt no proporcionado",
        ip: req.ip,
      });
      return res.status(400).json({ error: "Se requiere un 'prompt' válido." });
    }

    const enableRealtimeSearch = Boolean(options?.enableRealtimeSearch);
    const websiteType = options?.websiteType || "landing";
    const stylePreset = options?.stylePreset || "sophisticated-dark";
    const customTheme = options?.customTheme;

    let themeDetails = `Estilo Preset: ${stylePreset}`;
    if (stylePreset === "custom-builder" && customTheme) {
      themeDetails = `Tema Creado por Usuario:
- Nombre: ${customTheme.themeName || "Tema Personalizado"}
- Color Primario Hex: ${customTheme.primaryHex || "#10b981"}
- Color de Fondo Hex: ${customTheme.bgHex || "#0a0a0b"}
- Tipografía: ${customTheme.fontFamily || "sans"}
- Redondeo de Bordes: ${customTheme.borderRadius || "md"}`;
    }

    const ai = getGeminiClient();

    const systemInstruction = `Eres "ClaudeCraft Developer Engine", un desarrollador principal de nivel Claude 3.5 Sonnet.
Tu misión es generar la estructura de archivos modular para un sitio o aplicación web.

REGLAS STRICTAS DE CALIDAD Y "ANTI-SLOP DE IA":
1. REDACCIÓN Y COPYWRITING 100% HUMANO:
   - Todo el contenido textual (títulos, subtítulos, descripciones, párrafos, tarjetas, botones) DEBE sonar escrito por un profesional o copywriter humano.
   - NUNCA uses frases clichés ni jerga de IA ("Supercharge your workflow", "Empower your business", "En el dinámico mundo actual", "Solución integral de vanguardia").
   - Escribe textos auténticos, sencillos, cálidos, directos y con personalidad.
2. NUNCA crees páginas oscuras genéricas con gradientes neón azul/púrpura ni efectos fosforescentes deslumbrantes.
3. ESTILOS VISUALES IMPECABLES:
   - Aplica el tema visual: ${themeDetails}
   - Jerarquía tipográfica matemática clara, espaciado rítmico.
4. GENERACIÓN MODULAR POR ARCHIVOS SEPARADOS:
   Debes entregar tres archivos limpios en la lista 'files':
   - "index.html": Estructura HTML5 limpia y semántica con CDN de Tailwind CSS (<script src="https://cdn.tailwindcss.com"></script>).
   - "styles.css": Estilos CSS personalizados adicionales y animaciones si es necesario.
   - "app.js": Lógica JavaScript interactiva funcional.

SI LA BÚSQUEDA EN TIEMPO REAL ESTÁ ACTIVADA (${enableRealtimeSearch}):
Debes incluir en 'app.js' e 'index.html' una interfaz funcional que realice peticiones fetch a '/api/gemini/search' con body JSON { "query": "..." } y muestre los resultados y fuentes web devueltas.

REGLAS OBLIGATORIAS DE ROBUSTEZ PARA EL WIDGET DE BÚSQUEDA Y SCRIPTS DE BÚSQUEDA:
- El código JavaScript generado para el widget o analizador de búsqueda NUNCA debe asumir que un valor de configuración (ej: search engine, config, opciones) existe sin verificarlo antes; siempre debe usar un valor por defecto seguro (fallback) si cualquier parámetro viene null o undefined.
- Todo el bloque de inicialización y ejecución del widget de búsqueda DEBE estar envuelto en un bloque try/catch para que un fallo del widget no rompa el resto de la página ni bloquee el evento de "carga completa" (DOMContentLoaded / window load) que el resto de la aplicación espera.`;

    const userPrompt = `Solicitud del usuario: "${prompt}"
Configuración:
- Categoría: ${websiteType}
- Búsqueda en tiempo real Google AI: ${enableRealtimeSearch ? "SÍ" : "NO"}
- Estilo: ${stylePreset}

Devuelve el objeto JSON estricto con los campos: title, tagline, category, hasRealtimeSearch, stepLog (array de 6 pasos), designSystem, searchConfig y array 'files' con exactamente index.html, styles.css y app.js.`;

    const result = await generateValidatedJson(
      ai,
      {
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: 0 },
        },
      },
      WebsiteStructureSchema,
      "/api/generate-website"
    );

    const generatedData = result.data;
    const webId = "web_" + Date.now();
    const previewHtml = assemblePreviewHtml(generatedData.files, generatedData.title);

    const fullWebsiteRecord: StoredWebsite = {
      id: webId,
      title: generatedData.title,
      tagline: generatedData.tagline,
      category: generatedData.category,
      hasRealtimeSearch: generatedData.hasRealtimeSearch,
      stepLog: generatedData.stepLog,
      designSystem: generatedData.designSystem,
      searchConfig: generatedData.searchConfig,
      files: generatedData.files,
      createdAt: new Date().toISOString(),
      promptUsed: prompt,
    };

    // Store in server memory for incremental patch refinements
    websiteStore.set(webId, fullWebsiteRecord);

    logStructured({
      endpoint: "/api/generate-website",
      durationMs: Date.now() - startTime,
      status: "success",
      tokensUsed: {
        promptTokens: result.usageMetadata?.promptTokenCount,
        responseTokens: result.usageMetadata?.candidatesTokenCount,
        totalTokens: result.usageMetadata?.totalTokenCount,
      },
      ip: req.ip,
      details: { webId, filesCount: generatedData.files.length },
    });

    res.json({
      ...fullWebsiteRecord,
      previewHtml,
    });
  } catch (err: any) {
    logStructured({
      endpoint: "/api/generate-website",
      durationMs: Date.now() - startTime,
      status: "error",
      error: err.message || String(err),
      ip: req.ip,
    });
    res.status(500).json({
      error: "Error generando la página web.",
      details: err.message || String(err),
    });
  }
});

// 4. Targeted Incremental Refinement Endpoint
app.post("/api/refine-website", apiLimiter, authMiddleware, async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { website, instruction } = req.body;

    if (!instruction || typeof instruction !== "string") {
      logStructured({
        endpoint: "/api/refine-website",
        durationMs: Date.now() - startTime,
        status: "error",
        error: "Instrucción de refinamiento ausente",
        ip: req.ip,
      });
      return res.status(400).json({ error: "Se requiere 'instruction' válida." });
    }

    const webId = website?.id;
    let storedRecord = webId ? websiteStore.get(webId) : null;

    // Fallback if website was not found in server map
    if (!storedRecord && website?.files) {
      storedRecord = {
        id: webId || "web_" + Date.now(),
        title: website.title || "Página Web",
        tagline: website.tagline || "",
        category: website.category || "custom",
        hasRealtimeSearch: Boolean(website.hasRealtimeSearch),
        stepLog: website.stepLog || [],
        designSystem: website.designSystem || {},
        searchConfig: website.searchConfig,
        files: website.files,
        createdAt: new Date().toISOString(),
        promptUsed: website.promptUsed || "",
      };
    }

    if (!storedRecord) {
      return res.status(404).json({ error: "No se encontraron los archivos originales de la web para refinar." });
    }

    const ai = getGeminiClient();

    const existingFilesSummary = storedRecord.files
      .map((f) => `--- ARCHIVO: ${f.path} (${f.language}) ---\n${f.content}\n`)
      .join("\n");

    const systemInstruction = `Eres "ClaudeCraft Targeted Refinement Engine".
Tu trabajo es aplicar un parche o modificación dirigida (patch) sobre los archivos existentes de la web.
NO regeneres la aplicación entera sin necesidad. Revisa los archivos actuales y devuelve únicamente una explicación y la lista 'updatedFiles' con los archivos que sufrieron cambios o fueron creados/modificados.

Si la modificación afecta widgets o scripts de búsqueda: el código NUNCA debe asumir valores de configuración sin verificar (usar fallbacks seguros si es null/undefined) y la inicialización DEBE estar envuelta en try/catch.`;

    const userPrompt = `Archivos actuales del proyecto "${storedRecord.title}":
${existingFilesSummary}

Instrucción de modificación del usuario:
"${instruction}"

Devuelve un JSON estricto con:
- "explanation": Breve resumen del cambio aplicado.
- "updatedFiles": Array de objetos { "path": string, "language": string, "content": string } que contienen el código completo actualizado de CADA archivo modificado.`;

    const result = await generateValidatedJson(
      ai,
      {
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: 0 },
        },
      },
      RefinePatchSchema,
      "/api/refine-website"
    );

    const patchData = result.data;

    // Apply incremental patch to stored files
    const updatedFilesMap = new Map<string, StoredWebFile>();
    storedRecord.files.forEach((f) => updatedFilesMap.set(f.path, f));

    patchData.updatedFiles.forEach((uf) => {
      updatedFilesMap.set(uf.path, uf);
    });

    const finalFiles = Array.from(updatedFilesMap.values());
    storedRecord.files = finalFiles;
    storedRecord.promptUsed = `${storedRecord.promptUsed} -> [Refinado: ${instruction}]`;

    // Re-save updated record
    websiteStore.set(storedRecord.id, storedRecord);

    const updatedPreviewHtml = assemblePreviewHtml(finalFiles, storedRecord.title);

    logStructured({
      endpoint: "/api/refine-website",
      durationMs: Date.now() - startTime,
      status: "success",
      tokensUsed: {
        promptTokens: result.usageMetadata?.promptTokenCount,
        responseTokens: result.usageMetadata?.candidatesTokenCount,
        totalTokens: result.usageMetadata?.totalTokenCount,
      },
      ip: req.ip,
      details: {
        webId: storedRecord.id,
        patchedFilesCount: patchData.updatedFiles.length,
        explanation: patchData.explanation,
      },
    });

    res.json({
      ...storedRecord,
      previewHtml: updatedPreviewHtml,
    });
  } catch (err: any) {
    logStructured({
      endpoint: "/api/refine-website",
      durationMs: Date.now() - startTime,
      status: "error",
      error: err.message || String(err),
      ip: req.ip,
    });
    res.status(500).json({
      error: "Error al refinar la página web.",
      details: err.message || String(err),
    });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Static Production Server
// -------------------------------------------------------------

async function startServer() {
  validateEnv();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 ClaudeCraft Web Studio corriendo en http://0.0.0.0:${PORT}`);
  });
}

startServer();
