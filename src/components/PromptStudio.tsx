import React, { useState } from 'react';
import { Search, Sparkles, SlidersHorizontal, Globe, Layout, Palette, ArrowRight, Wand2, Paintbrush, ShieldCheck } from 'lucide-react';
import { GenerationOptions, StylePresetKey, CustomThemeConfig } from '../types';
import { THEME_PRESETS } from '../data/themes';

interface PromptStudioProps {
  onGenerate: (prompt: string, options: GenerationOptions) => void;
  isGenerating: boolean;
  onSelectTemplate: (templateId: string) => void;
}

export const PromptStudio: React.FC<PromptStudioProps> = ({
  onGenerate,
  isGenerating,
  onSelectTemplate,
}) => {
  const [prompt, setPrompt] = useState('');
  const [enableSearch, setEnableSearch] = useState(true);
  const [websiteType, setWebsiteType] = useState<GenerationOptions['websiteType']>('search-app');
  const [stylePreset, setStylePreset] = useState<StylePresetKey>('sophisticated-dark');
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Custom Theme Builder State
  const [customTheme, setCustomTheme] = useState<CustomThemeConfig>({
    themeName: 'Mi Tema Personalizado',
    primaryHex: '#10b981',
    bgHex: '#0a0a0b',
    fontFamily: 'sans',
    borderRadius: 'md',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    onGenerate(prompt, {
      enableRealtimeSearch: enableSearch,
      websiteType,
      stylePreset,
      customTheme: stylePreset === 'custom-builder' ? customTheme : undefined,
    });
  };

  const activeThemePreset = THEME_PRESETS.find((t) => t.id === stylePreset) || THEME_PRESETS[0];

  return (
    <div id="prompt-studio" class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl mb-6 text-zinc-100">
      
      {/* Title Header */}
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/80">
        <div class="flex items-center space-x-2.5">
          <div class="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 shadow-sm">
            <Wand2 class="w-4 h-4" />
          </div>
          <div>
            <h2 class="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span>Estudio de Creación de Páginas & Apps Web</span>
              <span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-full font-mono">
                Sophisticated Dark
              </span>
            </h2>
            <p class="text-xs text-zinc-400">Desarrollo paso a paso nivel Claude 3.5 Sonnet: Cero clichés, temas de diseño personalizables y Google Search AI.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          class="flex items-center space-x-1.5 text-xs text-zinc-300 hover:text-white transition bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl cursor-pointer"
        >
          <SlidersHorizontal class="w-3.5 h-3.5 text-emerald-400" />
          <span>{showAdvanced ? 'Opciones de Diseño' : 'Configurar Estilo & Temas'}</span>
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} class="space-y-4">
        
        {/* Prompt Input */}
        <div class="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe la página web o app que deseas construir (Ej: 'Un portal para buscar noticias de inteligencia artificial con gráficos en vivo' o 'Un portafolio de arquitectura minimalista con estilo de lujo')..."
            rows={3}
            class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none"
          />

          <div class="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Realtime Google Search AI Toggle */}
            <label class="flex items-center space-x-2.5 bg-zinc-950 border border-zinc-800/90 px-3.5 py-2 rounded-xl text-xs cursor-pointer select-none w-full sm:w-auto">
              <input
                type="checkbox"
                checked={enableSearch}
                onChange={(e) => setEnableSearch(e.target.checked)}
                class="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
              />
              <div class="flex items-center space-x-1.5">
                <Globe class={`w-4 h-4 ${enableSearch ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span class={enableSearch ? 'text-emerald-200 font-medium' : 'text-zinc-400'}>
                  Integrar Búsqueda Google IA en tiempo real
                </span>
              </div>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              class={`w-full sm:w-auto flex items-center justify-center space-x-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition cursor-pointer ${
                !prompt.trim() || isGenerating
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/60 border border-emerald-500/30'
              }`}
            >
              {isGenerating ? (
                <>
                  <Sparkles class="w-4 h-4 animate-spin text-emerald-200" />
                  <span>Construyendo página paso a paso...</span>
                </>
              ) : (
                <>
                  <Sparkles class="w-4 h-4 text-emerald-200" />
                  <span>Generar Página Web Nivel Claude</span>
                  <ArrowRight class="w-4 h-4" />
                </>
              )}
            </button>

          </div>
        </div>

        {/* Technical & Theme Options Bar */}
        {showAdvanced && (
          <div class="space-y-4 pt-4 border-t border-zinc-800/80 text-xs">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Category Selector */}
              <div>
                <label class="block text-zinc-400 mb-1.5 font-medium flex items-center space-x-1.5">
                  <Layout class="w-3.5 h-3.5 text-emerald-400" />
                  <span>Categoría de Aplicación Web</span>
                </label>
                <select
                  value={websiteType}
                  onChange={(e) => setWebsiteType(e.target.value as any)}
                  class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-emerald-500 font-medium"
                >
                  <option value="search-app">App con Búsqueda en Vivo (Google AI Grounding)</option>
                  <option value="landing">Página de Destino / Landing Page Profesional</option>
                  <option value="portfolio">Portafolio & Estudio Creativo de Lujo</option>
                  <option value="saas">SaaS & Dashboard Técnico de Control</option>
                  <option value="editorial">Revista Editorial & Prensa Periodística</option>
                  <option value="custom">Aplicación Personalizada a Medida</option>
                </select>
              </div>

              {/* Theme Preset Selector */}
              <div>
                <label class="block text-zinc-400 mb-1.5 font-medium flex items-center space-x-1.5">
                  <Palette class="w-3.5 h-3.5 text-emerald-400" />
                  <span>Seleccionar Tema Visual</span>
                </label>
                <select
                  value={stylePreset}
                  onChange={(e) => setStylePreset(e.target.value as StylePresetKey)}
                  class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-emerald-500 font-medium"
                >
                  {THEME_PRESETS.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Selected Theme Badge Info */}
            {stylePreset !== 'custom-builder' && activeThemePreset && (
              <div class="bg-zinc-950/80 border border-zinc-800/80 p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-5 h-5 rounded-md border border-zinc-700 shrink-0 shadow-inner"
                    style={{ backgroundColor: activeThemePreset.primaryHex }}
                  />
                  <div>
                    <span class="font-semibold text-white block">{activeThemePreset.name}</span>
                    <p class="text-zinc-400 text-[11px]">{activeThemePreset.description}</p>
                  </div>
                </div>
                <span class="hidden sm:inline-block bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2.5 py-1 rounded-lg text-[10px] font-mono shrink-0">
                  {activeThemePreset.antiSlopHighlight}
                </span>
              </div>
            )}

            {/* Custom Theme Builder Panel */}
            {stylePreset === 'custom-builder' && (
              <div class="bg-zinc-950 border border-emerald-900/50 p-4 rounded-xl space-y-4 animate-fadeIn">
                <div class="flex items-center space-x-2 text-emerald-400 font-semibold border-b border-zinc-800 pb-2">
                  <Paintbrush class="w-4 h-4" />
                  <span>Creador de Temas Personalizado para Creadores de Páginas</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  
                  {/* Theme Name */}
                  <div>
                    <label class="block text-zinc-400 mb-1">Nombre del Tema</label>
                    <input
                      type="text"
                      value={customTheme.themeName}
                      onChange={(e) => setCustomTheme({ ...customTheme, themeName: e.target.value })}
                      placeholder="Ej: Marca Corporativa"
                      class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Primary Color Picker */}
                  <div>
                    <label class="block text-zinc-400 mb-1">Color Principal (Acentos)</label>
                    <div class="flex items-center space-x-2">
                      <input
                        type="color"
                        value={customTheme.primaryHex}
                        onChange={(e) => setCustomTheme({ ...customTheme, primaryHex: e.target.value })}
                        class="w-8 h-8 rounded border border-zinc-700 bg-zinc-900 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={customTheme.primaryHex}
                        onChange={(e) => setCustomTheme({ ...customTheme, primaryHex: e.target.value })}
                        class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 font-mono text-zinc-200 uppercase"
                      />
                    </div>
                  </div>

                  {/* Background Color Picker */}
                  <div>
                    <label class="block text-zinc-400 mb-1">Fondo de Fondo (Lienzo)</label>
                    <div class="flex items-center space-x-2">
                      <input
                        type="color"
                        value={customTheme.bgHex}
                        onChange={(e) => setCustomTheme({ ...customTheme, bgHex: e.target.value })}
                        class="w-8 h-8 rounded border border-zinc-700 bg-zinc-900 cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={customTheme.bgHex}
                        onChange={(e) => setCustomTheme({ ...customTheme, bgHex: e.target.value })}
                        class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 font-mono text-zinc-200 uppercase"
                      />
                    </div>
                  </div>

                  {/* Font Family */}
                  <div>
                    <label class="block text-zinc-400 mb-1">Familia Tipográfica</label>
                    <select
                      value={customTheme.fontFamily}
                      onChange={(e) => setCustomTheme({ ...customTheme, fontFamily: e.target.value as any })}
                      class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="sans">Plus Jakarta Sans (Moderna)</option>
                      <option value="serif">Playfair Serif (Editorial & Lujo)</option>
                      <option value="mono">JetBrains Mono (Técnica Code)</option>
                      <option value="display">Space Grotesk (Diseño Futuro)</option>
                    </select>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </form>

      {/* Preset Inspirations / Prompts */}
      <div class="mt-4 pt-4 border-t border-zinc-800/60">
        <p class="text-xs font-medium text-zinc-400 mb-2.5 flex items-center justify-between">
          <span>Explora ejemplos interactivos listos para usar:</span>
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          
          <button
            onClick={() => onSelectTemplate('template_sentinel_news')}
            class="text-left bg-zinc-950/80 hover:bg-zinc-950 border border-zinc-800/80 hover:border-emerald-800/60 p-3 rounded-xl transition group cursor-pointer"
          >
            <div class="flex items-center space-x-2 text-emerald-300 font-semibold mb-1">
              <Globe class="w-3.5 h-3.5 text-emerald-400" />
              <span>Sentinel Tech Watch</span>
            </div>
            <p class="text-zinc-400 text-[11px] line-clamp-2">Noticias e investigación en vivo con integración de Google Search AI.</p>
          </button>

          <button
            onClick={() => onSelectTemplate('template_vanguard_agency')}
            class="text-left bg-zinc-950/80 hover:bg-zinc-950 border border-zinc-800/80 hover:border-stone-700/60 p-3 rounded-xl transition group cursor-pointer"
          >
            <div class="flex items-center space-x-2 text-stone-300 font-semibold mb-1">
              <Layout class="w-3.5 h-3.5 text-stone-400" />
              <span>Vanguard Studio</span>
            </div>
            <p class="text-zinc-400 text-[11px] line-clamp-2">Portafolio de diseño de lujo con tono cálido, serif elegante y cero clichés.</p>
          </button>

          <button
            onClick={() => onSelectTemplate('template_veritas_factcheck')}
            class="text-left bg-zinc-950/80 hover:bg-zinc-950 border border-zinc-800/80 hover:border-teal-800/60 p-3 rounded-xl transition group cursor-pointer"
          >
            <div class="flex items-center space-x-2 text-teal-300 font-semibold mb-1">
              <Search class="w-3.5 h-3.5 text-teal-400" />
              <span>Veritas Fact Verifier</span>
            </div>
            <p class="text-zinc-400 text-[11px] line-clamp-2">Verificación periodística con extracción directa de enlaces de Google.</p>
          </button>

        </div>
      </div>

    </div>
  );
};
