import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY no está configurada en las variables de entorno.");
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

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiKeyPresent: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Real-time Google Search AI Endpoint (Used by Studio & Generated Web Apps)
app.post("/api/gemini/search", async (req, res) => {
  try {
    const { query, category = "general", context = "" } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Se requiere un parámetro 'query' válido." });
    }

    const ai = getGeminiClient();

    const searchPrompt = `Estás actuando como un motor de búsqueda e investigación en tiempo real con Inteligencia Artificial nivel Claude.
Búsqueda del usuario: "${query}"
Categoría: ${category}
Contexto o instrucción adicional: ${context}

Proporciona una respuesta extremadamente precisa, estructurada, actualizada y libre de rodeos ni frases genéricas de IA.
Resume los hechos clave, datos cuantitativos más recientes y hallazgos principales en tiempo real.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: searchPrompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.3,
      },
    });

    const text = response.text || "No se obtuvieron resultados de búsqueda.";
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    // Parse web search citations cleanly
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

    res.json({
      text,
      citations,
      searchQueries: webSearchQueries,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Error en /api/gemini/search:", err);
    res.status(500).json({
      error: "Error ejecutando búsqueda en tiempo real con Google AI.",
      details: err.message || String(err),
    });
  }
});

// Generate Website Endpoint (Claude-Grade Web Developer Engine)
app.post("/api/generate-website", async (req, res) => {
  try {
    const { prompt, options } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Se requiere un 'prompt' válido." });
    }

    const enableRealtimeSearch = Boolean(options?.enableRealtimeSearch);
    const websiteType = options?.websiteType || "landing";
    const stylePreset = options?.stylePreset || "sophisticated-dark";
    const customTheme = options?.customTheme;

    let themeDetails = `Estilo Preset: ${stylePreset}`;
    if (stylePreset === 'custom-builder' && customTheme) {
      themeDetails = `Tema Creado por Usuario:
- Nombre: ${customTheme.themeName || 'Tema Personalizado'}
- Color Primario Hex: ${customTheme.primaryHex || '#10b981'}
- Color de Fondo Hex: ${customTheme.bgHex || '#0a0a0b'}
- Tipografía: ${customTheme.fontFamily || 'sans'}
- Redondeo de Bordes: ${customTheme.borderRadius || 'md'}`;
    }

    const ai = getGeminiClient();

    const systemInstruction = `Eres "ClaudeCraft Developer Engine", un modelo de IA especializado en crear aplicaciones web y páginas web con el nivel de rigor técnico, precisión matemática, elegancia y atención al detalle de un Desarrollador Principal nivel Claude 3.5 Sonnet.

REGLAS STRICTAS DE CALIDAD Y "ANTI-SLOP DE IA":
1. NUNCA uses frases clichés de marketing de IA (ej: "Supercharge your workflow", "Empower your business", "Revolutionize your experience").
2. NUNCA crees páginas oscuras genéricas con gradientes neón azul/púrpura ni efectos fosforescentes brillantes que parezcan hechos por plantillas genéricas de IA.
3. ESTILOS VISUALES IMPECABLES:
   - Aplica rigurosamente el tema de diseño solicitado:
     ${themeDetails}
   - Tipografía con jerarquía matemática: Títulos limpios, interlineado amplio (1.5-1.7), legibilidad absoluta.
   - Espaciado rítmico padding/margin consistente.
4. METODOLOGÍA EN PASOS EXPLICITA (Debes incluir el paso a paso detallado de razonamiento):
   - Paso 1: Análisis de Requerimientos y Experiencia de Usuario
   - Paso 2: Sistema de Diseño y Jerarquía Visual
   - Paso 3: Arquitectura de Estado y Lógica de Componentes
   - Paso 4: Estrategia de Búsqueda IA en Tiempo Real con Google (si está activada)
   - Paso 5: Generación de Código Limpio (HTML5 + Tailwind CSS + JS)
   - Paso 6: Verificación de Detalles y Micro-interacciones

SI LA BÚSQUEDA EN TIEMPO REAL ESTÁ ACTIVADA (${enableRealtimeSearch}):
Debes integrar una interfaz interactiva de búsqueda en la página generada que se conecte con nuestro endpoint '/api/gemini/search'. Incluye código JavaScript directo en el HTML generado que envíe consultas a POST '/api/gemini/search' con JSON body { query: string } y muestre los resultados y fuentes web de Google en tiempo real de forma limpia e interactiva.

DEBES RESPONDER EXCLUSIVAMENTE EN FORMATO JSON CON ESTA ESTRUCTURA EXACTA (sin markdown adicional fuera del JSON):
{
  "title": "Nombre de la Aplicación/Página",
  "tagline": "Eslogan profesional y humano sin clichés",
  "category": "${websiteType}",
  "hasRealtimeSearch": ${enableRealtimeSearch},
  "stepLog": [
    { "step": 1, "title": "Análisis de Requerimientos UX", "detail": "...", "status": "done" },
    { "step": 2, "title": "Sistema de Diseño Matemático", "detail": "...", "status": "done" },
    { "step": 3, "title": "Arquitectura de Componentes e Interacción", "detail": "...", "status": "done" },
    { "step": 4, "title": "Integración de Búsqueda Google IA", "detail": "...", "status": "done" },
    { "step": 5, "title": "Generación de Código HTML/CSS/JS", "detail": "...", "status": "done" },
    { "step": 6, "title": "Auditoría Anti-Slop y Pulido Visual", "detail": "...", "status": "done" }
  ],
  "designSystem": {
    "primaryColor": "#18181b",
    "backgroundColor": "${stylePreset === 'dark-obsidian' ? '#0f172a' : '#fafafa'}",
    "fontHeader": "Inter, sans-serif",
    "fontBody": "Inter, sans-serif",
    "spacingRatio": "1.25",
    "antiSlopRulesApplied": [
      "Sin gradientes neón púrpura/cian",
      "Textos redactados en tono humano y natural",
      "Espaciado UI ajustado a escala rítmica",
      "Búsqueda web en tiempo real integrada con fuentes verificadas"
    ]
  },
  "searchConfig": {
    "defaultQuery": "Últimas noticias de tecnología y desarrollo web",
    "placeholder": "Buscar información actualizada en tiempo real...",
    "searchType": "news"
  },
  "previewHtml": "<!DOCTYPE html><html>...HTML COMPLETO Y FUNCIONAL Y FUNCIONALMENTE INTERACTIVO...</html>",
  "files": [
    {
      "path": "index.html",
      "language": "html",
      "content": "..."
    },
    {
      "path": "styles.css",
      "language": "css",
      "content": "..."
    },
    {
      "path": "app.js",
      "language": "javascript",
      "content": "..."
    }
  ]
}`;

    const userPrompt = `Solicitud del usuario para construir la web:
"${prompt}"

Configuración:
- Tipo de web: ${websiteType}
- Búsqueda en tiempo real de Google integrada: ${enableRealtimeSearch ? 'SÍ (Incluir barra de búsqueda funcional conectada a /api/gemini/search)' : 'NO'}
- Estilo estético: ${stylePreset}

Genera el código web completo, con diseño pulido nivel desarrollador senior de Claude, interacción responsive completa y código HTML standalone limpio en 'previewHtml' listo para renderizar en un iframe sandbox.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const jsonText = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Error al parsear JSON devuelto por Gemini:", parseError);
      return res.status(500).json({ error: "No se pudo formatear la respuesta del modelo en JSON válido." });
    }

    // Attach metadata
    parsedData.id = "web_" + Date.now();
    parsedData.createdAt = new Date().toISOString();
    parsedData.promptUsed = prompt;

    res.json(parsedData);
  } catch (err: any) {
    console.error("Error en /api/generate-website:", err);
    res.status(500).json({
      error: "Error generando la página web con ClaudeCraft Engine.",
      details: err.message || String(err),
    });
  }
});

// Refine Website Endpoint
app.post("/api/refine-website", async (req, res) => {
  try {
    const { website, instruction } = req.body;

    if (!website || !instruction) {
      return res.status(400).json({ error: "Se requiere 'website' e 'instruction'." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Eres "ClaudeCraft Refinement Engine". Recibirás una aplicación/página web existente en formato JSON y una instrucción de modificación quirúrgica del usuario.
Modifica el código HTML/CSS/JS y la vista previa en 'previewHtml' para aplicar la mejora sin romper la estructura existente ni agregar clichés de IA.
Mantiene la misma estructura JSON que recibiste.`;

    const userPrompt = `Página web existente:
Título: ${website.title}
Vista HTML previa actual:
\`\`\`html
${website.previewHtml}
\`\`\`

Instrucción de refinamiento del usuario:
"${instruction}"

Aplica las correcciones manteniendo la máxima atención al detalle, estilo limpio y funcionalidad. Retorna el JSON completo actualizado.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    parsedData.id = website.id || "web_" + Date.now();
    parsedData.createdAt = new Date().toISOString();
    parsedData.promptUsed = `${website.promptUsed} -> [Refinado: ${instruction}]`;

    res.json(parsedData);
  } catch (err: any) {
    console.error("Error en /api/refine-website:", err);
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
    console.log(`🚀 ClaudeCraft Web Studio corriendo en puerto http://0.0.0.0:${PORT}`);
  });
}

startServer();
