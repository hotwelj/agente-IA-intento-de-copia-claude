import { GeneratedWebsite } from '../types';

export const PRESET_TEMPLATES: GeneratedWebsite[] = [
  {
    id: 'template_sentinel_news',
    title: 'Sentinel Real-Time AI & Tech Watch',
    tagline: 'Portal de noticias e investigación en tiempo real impulsado por Google Search AI',
    category: 'search-app',
    hasRealtimeSearch: true,
    promptUsed: 'Crea una página de noticias y monitoreo de tecnología e inteligencia artificial en tiempo real con integración de Google Search',
    createdAt: '2026-08-07T12:00:00Z',
    stepLog: [
      { step: 1, title: 'Análisis UX & Alcance', detail: 'Identificación de requerimientos para monitoreo en vivo de tendencias de IA y tecnología.', status: 'done' },
      { step: 2, title: 'Sistema de Diseño Anti-Slop', detail: 'Elección de paleta Warm Titanium (#121316 canvas, #E4E4E7 texto, #3F3F46 bordes). Cero gradientes fosforescentes.', status: 'done' },
      { step: 3, title: 'Arquitectura de Búsqueda', detail: 'Conexión asíncrona mediante fetch() hacia /api/gemini/search enviando payloads estructurados.', status: 'done' },
      { step: 4, title: 'Generación de Código HTML/JS', detail: 'Lógica JS nativa con renders de tarjetas, citas con hipervínculos a fuentes reales y estados de carga.', status: 'done' },
      { step: 5, title: 'Verificación de Calidad', detail: 'Verificación de contraste WCAG AA y respuesta en menos de 1 segundo.', status: 'done' },
    ],
    designSystem: {
      primaryColor: '#6366f1',
      backgroundColor: '#0f1115',
      fontHeader: 'Inter, system-ui, sans-serif',
      fontBody: 'Inter, system-ui, sans-serif',
      spacingRatio: '1.25',
      antiSlopRulesApplied: [
        'Sin textos inflados o frases repetitivas de IA',
        'Citas web directas extraídas de la API de Google Grounding en tiempo real',
        'Micro-interacciones limpias con retroalimentación visual inmediata'
      ]
    },
    searchConfig: {
      defaultQuery: 'Últimos avances en modelos de inteligencia artificial y tecnología 2026',
      placeholder: 'Ingresa un tema (ej: Gemini 2.5, lanzamientos Apple, mercado tech)...',
      searchType: 'news'
    },
    files: [
      {
        path: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sentinel Tech Watch</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0d0f12; color: #f3f4f6; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen pb-16">
  <header class="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</div>
        <div>
          <h1 class="text-base font-semibold tracking-tight text-white">Sentinel AI Watch</h1>
          <p class="text-xs text-zinc-400">Búsqueda e Investigación en Tiempo Real</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full text-xs text-emerald-300">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Google Search AI Grounding Activo</span>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-6 pt-10">
    <section class="text-center mb-10">
      <span class="inline-block text-xs font-medium tracking-wider text-indigo-400 uppercase bg-indigo-950/50 border border-indigo-800/40 px-3 py-1 rounded-full mb-3">
        Nivel Desarrollador Claude • Google AI Live
      </span>
      <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">Investigación de Noticias & Tendencias en Vivo</h2>
      <p class="text-zinc-400 max-w-xl mx-auto text-sm">
        Haz preguntas o busca cualquier tema. Sentinel consultará la web de Google en tiempo real para brindarte hechos verificados y fuentes originales.
      </p>
    </section>

    <!-- Search Form -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl mb-8">
      <form id="search-form" class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <input 
            type="text" 
            id="search-input" 
            value="Últimas novedades de modelos de lenguaje e IA en 2026"
            placeholder="Escribe lo que deseas investigar en tiempo real..." 
            class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>
        <button 
          type="submit" 
          id="search-btn"
          class="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span>Buscar en Vivo</span>
        </button>
      </form>
      
      <!-- Quick Tags -->
      <div class="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-zinc-800/60 text-xs">
        <span class="text-zinc-500">Sugerencias:</span>
        <button onclick="setQuery('Noticias de OpenAI y Gemini esta semana')" class="bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md transition">OpenAI & Gemini</button>
        <button onclick="setQuery('Precio actual de Nvidia y Bitcoin')" class="bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md transition">Mercado Tech & Cripto</button>
        <button onclick="setQuery('Lanzamientos tecnológicos recientes')" class="bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md transition">Lanzamientos Tech</button>
      </div>
    </div>

    <!-- Results Area -->
    <div id="results-container" class="space-y-6">
      <!-- Default Initial Result -->
      <div class="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <h3 class="text-sm font-semibold text-zinc-200">Resultados de Investigación Inicial</h3>
          </div>
          <span class="text-xs text-zinc-500 mono">Google Search Grounding</span>
        </div>
        <p class="text-zinc-300 text-sm leading-relaxed mb-4">
          La industria de la inteligencia artificial en 2026 está marcada por el salto a modelos multimodalidad en vivo con razonamiento profundo integrado, agentes autónomos de código y sistemas con grounded search de cero latencia.
        </p>
        <div class="border-t border-zinc-800/80 pt-4 mt-4">
          <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Fuentes Verificadas</h4>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="https://blog.google/technology/ai/" target="_blank" class="bg-zinc-800/80 hover:bg-zinc-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-zinc-700/50 flex items-center gap-1.5">
              <span>Google AI Official Blog</span>
              <svg class="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <a href="https://techcrunch.com" target="_blank" class="bg-zinc-800/80 hover:bg-zinc-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-zinc-700/50 flex items-center gap-1.5">
              <span>TechCrunch AI Reports</span>
              <svg class="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    function setQuery(text) {
      document.getElementById('search-input').value = text;
      performSearch();
    }

    async function performSearch() {
      const query = document.getElementById('search-input').value.trim();
      if (!query) return;

      const container = document.getElementById('results-container');
      const btn = document.getElementById('search-btn');

      btn.disabled = true;
      btn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Buscando en Google...';

      container.innerHTML = \`
        <div class="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center">
          <div class="inline-block p-3 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 mb-3 animate-pulse">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <p class="text-sm font-medium text-zinc-200">Consultando Google en tiempo real...</p>
          <p class="text-xs text-zinc-500 mt-1">Sintetizando información y extrayendo enlaces de fuentes primarias</p>
        </div>
      \`;

      try {
        const response = await fetch('/api/gemini/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        let citationsHtml = '';
        if (data.citations && data.citations.length > 0) {
          citationsHtml = \`
            <div class="border-t border-zinc-800/80 pt-4 mt-6">
              <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Fuentes y Referencias Web</h4>
              <div class="flex flex-wrap gap-2 text-xs">
                \${data.citations.map(c => \`
                  <a href="\${c.url}" target="_blank" rel="noopener noreferrer" class="bg-zinc-800/80 hover:bg-zinc-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-zinc-700/50 flex items-center gap-1.5 transition">
                    <span>\${c.title}</span>
                    <svg class="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                \`).join('')}
              </div>
            </div>
          \`;
        }

        const formattedText = data.text.replace(/\\n/g, '<br/>');

        container.innerHTML = \`
          <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/80">
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 class="text-sm font-semibold text-zinc-100">Resultado de Búsqueda en Tiempo Real</h3>
              </div>
              <span class="text-xs text-zinc-500 mono">\${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="text-zinc-200 text-sm leading-relaxed whitespace-pre-line">
              \${data.text}
            </div>
            \${citationsHtml}
          </div>
        \`;
      } catch (err) {
        container.innerHTML = \`
          <div class="bg-red-950/40 border border-red-800/60 rounded-2xl p-6 text-red-300 text-sm">
            <p class="font-semibold mb-1">Error ejecutando la búsqueda</p>
            <p class="text-xs text-red-400">\${err.message || 'No se pudo conectar con el servicio de búsqueda de Google AI.'}</p>
          </div>
        \`;
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span>Buscar en Vivo</span>';
      }
    }

    document.getElementById('search-form').addEventListener('submit', (e) => {
      e.preventDefault();
      performSearch();
    });
  </script>
</body>
</html>`
      }
    ],
    previewHtml: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sentinel Tech Watch</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0d0f12; color: #f3f4f6; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen pb-16">
  <header class="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</div>
        <div>
          <h1 class="text-base font-semibold tracking-tight text-white">Sentinel AI Watch</h1>
          <p class="text-xs text-zinc-400">Búsqueda e Investigación en Tiempo Real</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full text-xs text-emerald-300">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Google Search AI Grounding Activo</span>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-6 pt-10">
    <section class="text-center mb-10">
      <span class="inline-block text-xs font-medium tracking-wider text-indigo-400 uppercase bg-indigo-950/50 border border-indigo-800/40 px-3 py-1 rounded-full mb-3">
        Nivel Desarrollador Claude • Google AI Live
      </span>
      <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">Investigación de Noticias & Tendencias en Vivo</h2>
      <p class="text-zinc-400 max-w-xl mx-auto text-sm">
        Haz preguntas o busca cualquier tema. Sentinel consultará la web de Google en tiempo real para brindarte hechos verificados y fuentes originales.
      </p>
    </section>

    <!-- Search Form -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl mb-8">
      <form id="search-form" class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <input 
            type="text" 
            id="search-input" 
            value="Últimas novedades de modelos de lenguaje e IA en 2026"
            placeholder="Escribe lo que deseas investigar en tiempo real..." 
            class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>
        <button 
          type="submit" 
          id="search-btn"
          class="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span>Buscar en Vivo</span>
        </button>
      </form>
      
      <!-- Quick Tags -->
      <div class="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-zinc-800/60 text-xs">
        <span class="text-zinc-500">Sugerencias:</span>
        <button onclick="setQuery('Noticias de OpenAI y Gemini esta semana')" class="bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md transition">OpenAI & Gemini</button>
        <button onclick="setQuery('Precio actual de Nvidia y Bitcoin')" class="bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md transition">Mercado Tech & Cripto</button>
        <button onclick="setQuery('Lanzamientos tecnológicos recientes')" class="bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md transition">Lanzamientos Tech</button>
      </div>
    </div>

    <!-- Results Area -->
    <div id="results-container" class="space-y-6">
      <div class="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <h3 class="text-sm font-semibold text-zinc-200">Resultados de Investigación Inicial</h3>
          </div>
          <span class="text-xs text-zinc-500 mono">Google Search Grounding</span>
        </div>
        <p class="text-zinc-300 text-sm leading-relaxed mb-4">
          La industria de la inteligencia artificial en 2026 está marcada por el salto a modelos multimodalidad en vivo con razonamiento profundo integrado, agentes autónomos de código y sistemas con grounded search de cero latencia.
        </p>
        <div class="border-t border-zinc-800/80 pt-4 mt-4">
          <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Fuentes Verificadas</h4>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="https://blog.google/technology/ai/" target="_blank" class="bg-zinc-800/80 hover:bg-zinc-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-zinc-700/50 flex items-center gap-1.5">
              <span>Google AI Official Blog</span>
              <svg class="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <a href="https://techcrunch.com" target="_blank" class="bg-zinc-800/80 hover:bg-zinc-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-zinc-700/50 flex items-center gap-1.5">
              <span>TechCrunch AI Reports</span>
              <svg class="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    function setQuery(text) {
      document.getElementById('search-input').value = text;
      performSearch();
    }

    async function performSearch() {
      const query = document.getElementById('search-input').value.trim();
      if (!query) return;

      const container = document.getElementById('results-container');
      const btn = document.getElementById('search-btn');

      btn.disabled = true;
      btn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Buscando en Google...';

      container.innerHTML = \`
        <div class="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center">
          <div class="inline-block p-3 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 mb-3 animate-pulse">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <p class="text-sm font-medium text-zinc-200">Consultando Google en tiempo real...</p>
          <p class="text-xs text-zinc-500 mt-1">Sintetizando información y extrayendo enlaces de fuentes primarias</p>
        </div>
      \`;

      try {
        const response = await fetch('/api/gemini/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        let citationsHtml = '';
        if (data.citations && data.citations.length > 0) {
          citationsHtml = \`
            <div class="border-t border-zinc-800/80 pt-4 mt-6">
              <h4 class="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Fuentes y Referencias Web</h4>
              <div class="flex flex-wrap gap-2 text-xs">
                \${data.citations.map(c => \`
                  <a href="\${c.url}" target="_blank" rel="noopener noreferrer" class="bg-zinc-800/80 hover:bg-zinc-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-zinc-700/50 flex items-center gap-1.5 transition">
                    <span>\${c.title}</span>
                    <svg class="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                \`).join('')}
              </div>
            </div>
          \`;
        }

        container.innerHTML = \`
          <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/80">
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 class="text-sm font-semibold text-zinc-100">Resultado de Búsqueda en Tiempo Real</h3>
              </div>
              <span class="text-xs text-zinc-500 mono">\${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="text-zinc-200 text-sm leading-relaxed whitespace-pre-line">
              \${data.text}
            </div>
            \${citationsHtml}
          </div>
        \`;
      } catch (err) {
        container.innerHTML = \`
          <div class="bg-red-950/40 border border-red-800/60 rounded-2xl p-6 text-red-300 text-sm">
            <p class="font-semibold mb-1">Error ejecutando la búsqueda</p>
            <p class="text-xs text-red-400">\${err.message || 'No se pudo conectar con el servicio de búsqueda de Google AI.'}</p>
          </div>
        \`;
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span>Buscar en Vivo</span>';
      }
    }

    document.getElementById('search-form').addEventListener('submit', (e) => {
      e.preventDefault();
      performSearch();
    });
  </script>
</body>
</html>`
  },
  {
    id: 'template_vanguard_agency',
    title: 'Vanguard Architecture & Craft Studio',
    tagline: 'Estudio de diseño y desarrollo web de alta gama en tono cálido con tipografía editorial',
    category: 'portfolio',
    hasRealtimeSearch: false,
    promptUsed: 'Crea una página web estilo portafolio editorial de lujo para un estudio de diseño y arquitectura, sin elementos genéricos de IA, fondo blanco cálido y tipografía serif',
    createdAt: '2026-08-07T11:00:00Z',
    stepLog: [
      { step: 1, title: 'Investigación de Marca', detail: 'Definición de arquetipo de marca de lujo minimalista, enfoque en espacio negativo.', status: 'done' },
      { step: 2, title: 'Reglas Anti-Slop', detail: 'Uso estricto de fondo Warm Linen (#FAF9F5), tipografía Serif (Newsreader/Playfair), cero elementos neón.', status: 'done' },
      { step: 3, title: 'Disposición Proporcional', detail: 'Grid asimétrico con margen 1.333 y tarjetas de proyectos expandibles.', status: 'done' },
      { step: 4, title: 'Ensamblado HTML & Interacciones', detail: 'Animaciones suaves CSS, modales interactivos para ver detalles de obras.', status: 'done' }
    ],
    designSystem: {
      primaryColor: '#1a1917',
      backgroundColor: '#faf9f5',
      fontHeader: 'Playfair Display, Georgia, serif',
      fontBody: 'Plus Jakarta Sans, sans-serif',
      spacingRatio: '1.333',
      antiSlopRulesApplied: [
        'Fondo blanco lino sobrio sin gradientes artificiales',
        'Cero frases clisés de marketing',
        'Contraste tipográfico perfecto con serif sobria'
      ]
    },
    files: [],
    previewHtml: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanguard Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #faf9f5; color: #1c1b18; }
    .serif { font-family: 'Playfair Display', Georgia, serif; }
  </style>
</head>
<body class="min-h-screen">
  <nav class="max-w-6xl mx-auto px-8 py-8 flex items-center justify-between border-b border-stone-200/80">
    <a href="#" class="serif text-xl font-medium tracking-tight text-stone-900">Vanguard & Co.</a>
    <div class="flex items-center space-x-8 text-xs font-medium text-stone-600 tracking-wider uppercase">
      <a href="#obras" class="hover:text-stone-900 transition">Obras</a>
      <a href="#estudio" class="hover:text-stone-900 transition">El Estudio</a>
      <a href="#contacto" class="bg-stone-900 text-stone-100 px-4 py-2 rounded-full hover:bg-stone-800 transition">Contacto</a>
    </div>
  </nav>

  <main class="max-w-6xl mx-auto px-8 pt-20 pb-16">
    <section class="max-w-3xl mb-24">
      <p class="text-xs font-semibold tracking-widest text-stone-500 uppercase mb-4">Diseño Web & Arquitectura Digital</p>
      <h1 class="serif text-4xl sm:text-6xl font-normal leading-tight text-stone-900 mb-8">
        Construimos experiencias digitales donde la precisión técnica y la sobriedad estética convergen.
      </h1>
      <p class="text-stone-600 text-base leading-relaxed max-w-xl">
        Rechazamos las plantillas genéricas. Cada estructura web se diseña desde cero con jerarquía tipográfica rigurosa, proporciones matemáticas y rendimiento impecable.
      </p>
    </section>

    <section id="obras" class="mb-24">
      <div class="flex items-end justify-between mb-10 pb-4 border-b border-stone-200">
        <div>
          <h2 class="serif text-2xl text-stone-900">Proyectos Seleccionados</h2>
          <p class="text-xs text-stone-500 mt-1">Sistemas web de alta precisión</p>
        </div>
        <span class="text-xs font-mono text-stone-400">2025—2026</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <article class="group cursor-pointer">
          <div class="aspect-video bg-stone-200 rounded-xl overflow-hidden mb-4 relative">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Arquitectura" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div class="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition"></div>
          </div>
          <div class="flex items-baseline justify-between">
            <h3 class="serif text-lg font-medium text-stone-900 group-hover:underline">Residencia Casa Bosque</h3>
            <span class="text-xs text-stone-500">Arquitectura Residencial</span>
          </div>
          <p class="text-xs text-stone-500 mt-1">Identidad de marca y plataforma web inmersiva para estudio arquitectónico en los Alpes.</p>
        </article>

        <article class="group cursor-pointer">
          <div class="aspect-video bg-stone-200 rounded-xl overflow-hidden mb-4 relative">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" alt="SaaS Minimalista" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div class="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition"></div>
          </div>
          <div class="flex items-baseline justify-between">
            <h3 class="serif text-lg font-medium text-stone-900 group-hover:underline">Monolith OS Interface</h3>
            <span class="text-xs text-stone-500">SaaS & FinTech</span>
          </div>
          <p class="text-xs text-stone-500 mt-1">Diseño de interfaz para plataforma analítica financiera con latencia ultra baja.</p>
        </article>
      </div>
    </section>

    <footer class="pt-12 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500">
      <p>© 2026 Vanguard Studio. Creado con nivel de desarrollo Claude.</p>
      <p class="mt-2 sm:mt-0">Diseño anti-slop • Tipografía sobria</p>
    </footer>
  </main>
</body>
</html>`
  },
  {
    id: 'template_veritas_factcheck',
    title: 'Veritas Fact & Source Verifier',
    tagline: 'Verificador de información en tiempo real con inteligencia artificial y extracción de fuentes',
    category: 'search-app',
    hasRealtimeSearch: true,
    promptUsed: 'Crea una herramienta web de verificación de datos e investigación periodística con IA que busque en Google en tiempo real y extraiga enlaces directos',
    createdAt: '2026-08-07T10:00:00Z',
    stepLog: [
      { step: 1, title: 'Definición de Casos de Uso', detail: 'Verificación periodística, análisis de veracidad y contraste de datos en vivo.', status: 'done' },
      { step: 2, title: 'Alineación Estética', detail: 'Paleta Editorial Neutral (Lino #FAF8F5, Tinta #1E1E1E). Estilo minimalista periodístico.', status: 'done' },
      { step: 3, title: 'Lógica de Grounding', detail: 'Búsqueda en tiempo real a través de Gemini AI con citación limpia.', status: 'done' }
    ],
    designSystem: {
      primaryColor: '#0f766e',
      backgroundColor: '#fcfbf9',
      fontHeader: 'Georgia, serif',
      fontBody: 'Plus Jakarta Sans, sans-serif',
      spacingRatio: '1.25',
      antiSlopRulesApplied: [
        'Formato limpio de periódico moderno',
        'Respuestas objetivas basadas únicamente en fuentes de la web',
        'Interacciones sin distracciones visuales'
      ]
    },
    files: [],
    previewHtml: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Veritas Fact Verifier</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #fcfbf9; color: #1c1917; }
    .serif { font-family: 'Newsreader', Georgia, serif; }
  </style>
</head>
<body class="min-h-screen pb-12">
  <header class="border-b border-stone-200 bg-stone-50/80 sticky top-0 z-50 backdrop-blur">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="text-xl font-bold serif text-teal-900">VERITAS</span>
        <span class="text-xs bg-teal-100 text-teal-800 font-medium px-2 py-0.5 rounded">Google Search Grounding</span>
      </div>
      <p class="text-xs text-stone-500">Verificación e Investigación en Vivo</p>
    </div>
  </header>

  <main class="max-w-3xl mx-auto px-6 pt-12">
    <div class="text-center mb-8">
      <h1 class="serif text-3xl sm:text-4xl text-stone-900 font-normal mb-3">Verificador de Hechos & Noticias</h1>
      <p class="text-stone-600 text-sm max-w-lg mx-auto">Escribe cualquier afirmación, evento o noticia reciente. Veritas investigará en tiempo real en la web de Google y te devolverá un resumen verificado con sus enlaces.</p>
    </div>

    <div class="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm mb-8">
      <form id="v-form" class="flex flex-col sm:flex-row gap-3">
        <input type="text" id="v-input" value="¿Qué pasó en el último evento de tecnología de Google o OpenAI?" placeholder="Ingresa una afirmación o hecho a verificar..." class="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-700" />
        <button type="submit" id="v-btn" class="bg-teal-800 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition">Verificar Hecho</button>
      </form>
    </div>

    <div id="v-result" class="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
        <span class="text-xs font-semibold text-teal-800 uppercase tracking-wider">Estado: Listo</span>
        <span class="text-xs text-stone-400">Motor Google AI</span>
      </div>
      <p class="text-stone-700 text-sm leading-relaxed">
        Ingresa una búsqueda arriba para consultar a tiempo real en la Web.
      </p>
    </div>
  </main>

  <script>
    document.getElementById('v-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const q = document.getElementById('v-input').value.trim();
      if(!q) return;

      const resDiv = document.getElementById('v-result');
      const btn = document.getElementById('v-btn');

      btn.disabled = true;
      btn.innerText = 'Investigando...';
      resDiv.innerHTML = '<p class="text-stone-500 text-sm animate-pulse">Buscando fuentes oficiales en Google...</p>';

      try {
        const res = await fetch('/api/gemini/search', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ query: q, context: 'Verificación de hechos periodísticos' })
        });
        const data = await res.json();

        let sources = '';
        if(data.citations && data.citations.length) {
          sources = '<div class="mt-4 pt-4 border-t border-stone-100"><p class="text-xs font-semibold text-stone-500 mb-2">FUENTES VERIFICADAS EN LA WEB:</p><div class="flex flex-wrap gap-2">' +
            data.citations.map(c => \`<a href="\${c.url}" target="_blank" class="text-xs bg-teal-50 border border-teal-200 text-teal-800 px-2.5 py-1 rounded hover:bg-teal-100 transition">\${c.title}</a>\`).join('') +
            '</div></div>';
        }

        resDiv.innerHTML = \`
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
            <span class="text-xs font-semibold text-teal-800 uppercase">Resultado Verificado</span>
            <span class="text-xs text-stone-400">\${new Date().toLocaleTimeString()}</span>
          </div>
          <div class="text-stone-800 text-sm leading-relaxed whitespace-pre-line">\${data.text}</div>
          \${sources}
        \`;
      } catch(err) {
        resDiv.innerHTML = '<p class="text-red-600 text-sm">Error en la búsqueda en vivo.</p>';
      } finally {
        btn.disabled = false;
        btn.innerText = 'Verificar Hecho';
      }
    });
  </script>
</body>
</html>`
  }
];
