import React, { useState, useRef } from 'react';
import { Monitor, Tablet, Smartphone, ExternalLink, Code2, Search, Palette, RefreshCw, MessageSquare } from 'lucide-react';
import { GeneratedWebsite } from '../types';
import { CodeInspector } from './CodeInspector';
import { AIChatPanel } from './AIChatPanel';

interface WebsitePreviewProps {
  website: GeneratedWebsite;
  onRefine: (instruction: string) => void;
  isRefining: boolean;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({ website, onRefine, isRefining }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'ai-chat' | 'search-tester' | 'code' | 'design'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleTestSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuery.trim() || isSearching) return;

    setIsSearching(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/gemini/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: testQuery }),
      });
      const data = await response.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ error: err.message || 'Error realizando la búsqueda.' });
    } finally {
      setIsSearching(false);
    }
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'tablet':
        return 'w-[768px]';
      case 'mobile':
        return 'w-[375px]';
      default:
        return 'w-full';
    }
  };

  const handleOpenNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(website.previewHtml);
      newWindow.document.close();
    }
  };

  return (
    <div id="website-preview" class="bg-[#0a0a0b] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl text-[#e5e5e7] flex flex-col">
      
      {/* Top Header Bar */}
      <div class="bg-[#0d0d0e] border-b border-[#262626] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Title & Info */}
        <div class="flex items-center space-x-3">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <h3 class="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
              <span>{website.title}</span>
              {website.hasRealtimeSearch && (
                <span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-md font-semibold font-mono">
                  Google Search Grounding
                </span>
              )}
            </h3>
            <p class="text-xs text-[#a1a1aa]">{website.tagline}</p>
          </div>
        </div>

        {/* Tab Switcher & Viewport Controls */}
        <div class="flex items-center space-x-3 overflow-x-auto">
          
          {/* Main Navigation Tabs */}
          <div class="flex items-center bg-[#18181b] border border-[#262626] rounded-xl p-1 text-xs">
            
            <button
              onClick={() => setActiveTab('preview')}
              class={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'preview'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Monitor class="w-3.5 h-3.5" />
              <span>Vista Previa</span>
            </button>

            {/* Continuous AI Developer Chat Tab */}
            <button
              onClick={() => setActiveTab('ai-chat')}
              class={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'ai-chat'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <MessageSquare class="w-3.5 h-3.5 text-emerald-300" />
              <span>Chat Continuo & Cambios IA</span>
            </button>

            {website.hasRealtimeSearch && (
              <button
                onClick={() => setActiveTab('search-tester')}
                class={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'search-tester'
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                <Search class="w-3.5 h-3.5" />
                <span>Probar Búsqueda IA</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('code')}
              class={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'code'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Code2 class="w-3.5 h-3.5" />
              <span>Código Fuente</span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              class={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'design'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Palette class="w-3.5 h-3.5" />
              <span>Diseño & Anti-Slop</span>
            </button>

          </div>

          {/* Viewport Sizer (Only in preview tab) */}
          {activeTab === 'preview' && (
            <div class="hidden md:flex items-center bg-[#18181b] border border-[#262626] rounded-xl p-1 text-xs space-x-1">
              <button
                onClick={() => setViewport('desktop')}
                class={`p-1.5 rounded-lg transition ${viewport === 'desktop' ? 'bg-[#27272a] text-emerald-400' : 'text-[#71717a] hover:text-white'}`}
                title="Vista Escritorio"
              >
                <Monitor class="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                class={`p-1.5 rounded-lg transition ${viewport === 'tablet' ? 'bg-[#27272a] text-emerald-400' : 'text-[#71717a] hover:text-white'}`}
                title="Vista Tablet"
              >
                <Tablet class="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                class={`p-1.5 rounded-lg transition ${viewport === 'mobile' ? 'bg-[#27272a] text-emerald-400' : 'text-[#71717a] hover:text-white'}`}
                title="Vista Móvil"
              >
                <Smartphone class="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* External tab button */}
          <button
            onClick={handleOpenNewTab}
            class="p-2 bg-[#18181b] hover:bg-[#27272a] border border-[#262626] text-[#e5e5e7] rounded-xl transition cursor-pointer shrink-0"
            title="Abrir en nueva pestaña"
          >
            <ExternalLink class="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Main Content Body */}
      <div class="p-4 bg-[#0a0a0b] flex-1 min-h-[640px]">
        
        {/* Tab 1: Live Interactive Iframe Preview */}
        {activeTab === 'preview' && (
          <div class="w-full h-full flex justify-center bg-[#0d0d0e] rounded-xl border border-[#262626] overflow-hidden p-2">
            <div class={`${getViewportWidth()} transition-all duration-300 h-[620px] rounded-lg overflow-hidden bg-white shadow-2xl border border-zinc-300`}>
              <iframe
                ref={iframeRef}
                title={website.title}
                srcDoc={website.previewHtml}
                class="w-full h-full border-0"
                sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Continuous AI Developer Chat & Refinement */}
        {activeTab === 'ai-chat' && (
          <AIChatPanel website={website} onRefine={onRefine} isRefining={isRefining} />
        )}

        {/* Tab 3: Live Google Search AI Tester */}
        {activeTab === 'search-tester' && (
          <div class="max-w-3xl mx-auto py-6">
            <div class="bg-[#0d0d0e] border border-[#262626] rounded-2xl p-6 shadow-xl">
              <div class="flex items-center space-x-2 text-emerald-400 font-semibold text-sm mb-2">
                <Search class="w-4 h-4" />
                <span>Probador Directo del Motor de Búsqueda Google AI Integrado</span>
              </div>
              <p class="text-xs text-[#a1a1aa] mb-6">
                Prueba cómo la API en tiempo real responde con fuentes verificadas de Google Grounding para la página web generada.
              </p>

              <form onSubmit={handleTestSearch} class="space-y-4 mb-6">
                <div class="flex gap-2">
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    placeholder="Ingresa una búsqueda (ej: 'Noticias de tecnología esta semana')..."
                    class="flex-1 bg-[#18181b] border border-[#262626] rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={!testQuery.trim() || isSearching}
                    class="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-3 rounded-xl text-xs transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    {isSearching ? <RefreshCw class="w-4 h-4 animate-spin" /> : <Search class="w-4 h-4" />}
                    <span>Buscar</span>
                  </button>
                </div>
              </form>

              {testResult && (
                <div class="bg-[#18181b] border border-[#262626] rounded-xl p-5 text-xs text-zinc-200">
                  <h4 class="font-semibold text-emerald-400 mb-3 flex items-center justify-between border-b border-[#262626] pb-2">
                    <span>Respuesta en Tiempo Real (Google Grounded AI)</span>
                    <span class="text-[10px] text-[#71717a]">{new Date().toLocaleTimeString()}</span>
                  </h4>

                  {testResult.error ? (
                    <p class="text-red-400">{testResult.error}</p>
                  ) : (
                    <>
                      <p class="whitespace-pre-line leading-relaxed mb-4">{testResult.text}</p>
                      {testResult.citations && testResult.citations.length > 0 && (
                        <div class="border-t border-[#262626] pt-3">
                          <span class="font-semibold text-[#a1a1aa] block mb-2">Fuentes Web Originales:</span>
                          <div class="flex flex-wrap gap-2">
                            {testResult.citations.map((c: any, i: number) => (
                              <a
                                key={i}
                                href={c.url}
                                target="_blank"
                                rel="noreferrer"
                                class="bg-[#0a0a0b] border border-[#262626] text-emerald-300 hover:text-emerald-200 px-2.5 py-1 rounded-md text-[11px] transition flex items-center space-x-1"
                              >
                                <span>{c.title}</span>
                                <ExternalLink class="w-3 h-3 text-[#71717a]" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Code Inspector */}
        {activeTab === 'code' && (
          <CodeInspector website={website} onRefine={onRefine} isRefining={isRefining} />
        )}

        {/* Tab 5: Design System & Anti-Slop Specs */}
        {activeTab === 'design' && (
          <div class="max-w-4xl mx-auto py-6 space-y-6">
            <div class="bg-[#0d0d0e] border border-[#262626] rounded-2xl p-6 text-xs space-y-6">
              
              <div class="flex items-center justify-between border-b border-[#262626] pb-4">
                <div>
                  <h3 class="text-sm font-bold text-white mb-1">Especificación del Sistema de Diseño</h3>
                  <p class="text-[#a1a1aa]">Jerarquía visual y reglas anti-cliché aplicadas por el desarrollador Claude</p>
                </div>
                <span class="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-medium">
                  Auditoría Anti-Slop Pasada
                </span>
              </div>

              {/* Tokens Grid */}
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-[#18181b] p-4 rounded-xl border border-[#262626]">
                  <span class="text-[#71717a] font-mono text-[10px] uppercase block mb-1">Color Principal</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded border border-zinc-700" style={{ backgroundColor: website.designSystem.primaryColor }}></div>
                    <span class="font-mono text-zinc-200 font-semibold">{website.designSystem.primaryColor}</span>
                  </div>
                </div>

                <div class="bg-[#18181b] p-4 rounded-xl border border-[#262626]">
                  <span class="text-[#71717a] font-mono text-[10px] uppercase block mb-1">Fondo de Lienzo</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 rounded border border-zinc-700" style={{ backgroundColor: website.designSystem.backgroundColor }}></div>
                    <span class="font-mono text-zinc-200 font-semibold">{website.designSystem.backgroundColor}</span>
                  </div>
                </div>

                <div class="bg-[#18181b] p-4 rounded-xl border border-[#262626]">
                  <span class="text-[#71717a] font-mono text-[10px] uppercase block mb-1">Escala de Espaciado</span>
                  <span class="font-mono text-zinc-200 font-semibold">{website.designSystem.spacingRatio} (Escala Matemática)</span>
                </div>

                <div class="bg-[#18181b] p-4 rounded-xl border border-[#262626]">
                  <span class="text-[#71717a] font-mono text-[10px] uppercase block mb-1">Tipografía Elegida</span>
                  <span class="font-mono text-zinc-200 font-semibold truncate block">{website.designSystem.fontHeader}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
