import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptStudio } from './components/PromptStudio';
import { DevReasoningLog } from './components/DevReasoningLog';
import { WebsitePreview } from './components/WebsitePreview';
import { AntiSlopModal } from './components/AntiSlopModal';
import { PRESET_TEMPLATES } from './data/templates';
import { GeneratedWebsite, GenerationOptions } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeWebsite, setActiveWebsite] = useState<GeneratedWebsite>(PRESET_TEMPLATES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAntiSlopModal, setShowAntiSlopModal] = useState(false);
  const [geminiConnected, setGeminiConnected] = useState(true);

  // Health check on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.geminiKeyPresent) {
          setGeminiConnected(true);
        }
      })
      .catch(() => setGeminiConnected(false));
  }, []);

  // Handle new website generation
  const handleGenerate = async (prompt: string, options: GenerationOptions) => {
    setIsGenerating(true);
    setError(null);
    const previousWebsite = activeWebsite;

    const initialSteps = [
      { step: 1, title: 'Análisis de Requerimientos & UX', detail: 'Analizando intención del usuario y definiendo arquitectura de información...', status: 'active' as const },
      { step: 2, title: 'Sistema de Diseño Anti-Slop', detail: 'Configurando escala matemática de espaciado y tipografía sin clichés...', status: 'pending' as const },
      { step: 3, title: 'Arquitectura de Estado & Lógica', detail: 'Definiendo componentes interactivos e interacciones del usuario...', status: 'pending' as const },
      { step: 4, title: 'Integración Búsqueda Google IA', detail: options.enableRealtimeSearch ? 'Configurando endpoint /api/gemini/search y cliente JS...' : 'Búsqueda no requerida para esta página.', status: 'pending' as const },
      { step: 5, title: 'Generación de Código HTML/CSS/JS', detail: 'Escribiendo código limpio y optimizado con Gemini AI...', status: 'pending' as const },
      { step: 6, title: 'Auditoría Final de Detalle', detail: 'Verificando contraste WCAG y micro-interacciones...', status: 'pending' as const }
    ];

    let currentActiveStep = 1;

    const pendingWebsite: GeneratedWebsite = {
      ...activeWebsite,
      id: 'gen_' + Date.now(),
      title: 'Generando aplicación web...',
      tagline: 'Ejecutando metodología de desarrollo paso a paso sin omitir detalles...',
      promptUsed: prompt,
      stepLog: initialSteps
    };

    setActiveWebsite(pendingWebsite);

    // Animate progress step by step
    const progressInterval = setInterval(() => {
      if (currentActiveStep < 6) {
        currentActiveStep++;
        setActiveWebsite((prev) => ({
          ...prev,
          stepLog: prev.stepLog.map((s) => {
            if (s.step < currentActiveStep) return { ...s, status: 'done' };
            if (s.step === currentActiveStep) return { ...s, status: 'active' };
            return { ...s, status: 'pending' };
          })
        }));
      }
    }, 2500);

    try {
      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_APP_API_KEY || '',
        },
        body: JSON.stringify({ prompt, options }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Error al generar la página web.');
      }

      // Mark all steps done on success
      const completedData = {
        ...data,
        stepLog: (data.stepLog || initialSteps).map((s: any) => ({ ...s, status: 'done' }))
      };

      setActiveWebsite(completedData);
    } catch (err: any) {
      console.error('Error generando web:', err);
      setActiveWebsite(previousWebsite);
      setError(err.message || 'No se pudo generar la web. Por favor intenta nuevamente.');
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  // Handle surgical code refinement
  const handleRefine = async (instruction: string) => {
    if (!activeWebsite || isRefining) return;
    setIsRefining(true);
    setError(null);

    try {
      const response = await fetch('/api/refine-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_APP_API_KEY,
        },
        body: JSON.stringify({ website: activeWebsite, instruction }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Error al refinar la página web.');
      }

      setActiveWebsite(data);
    } catch (err: any) {
      console.error('Error refinando web:', err);
      setError(err.message || 'No se pudo aplicar la modificación.');
    } finally {
      setIsRefining(false);
    }
  };

  // Handle template selection
  const handleSelectTemplate = (templateId: string) => {
    const found = PRESET_TEMPLATES.find((t) => t.id === templateId);
    if (found) {
      setActiveWebsite(found);
      setError(null);
    }
  };

  return (
    <div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-900 selection:text-indigo-100 flex flex-col">
      
      {/* Top Navigation */}
      <Header
        onOpenAntiSlopModal={() => setShowAntiSlopModal(true)}
        geminiConnected={geminiConnected}
      />

      {/* Main Container */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        
        {/* Error Alert if any */}
        {error && (
          <div class="bg-red-950/80 border border-red-800 text-red-200 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-lg">
            <div class="flex items-center space-x-2">
              <AlertCircle class="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              class="text-red-400 hover:text-red-200 font-bold ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Prompt Studio Input */}
        <PromptStudio
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          onSelectTemplate={handleSelectTemplate}
        />

        {/* Step-by-step Developer Reasoning Log */}
        {activeWebsite.stepLog && activeWebsite.stepLog.length > 0 && (
          <DevReasoningLog steps={activeWebsite.stepLog} isGenerating={isGenerating} />
        )}

        {/* Live Interactive Website Preview & Studio */}
        <WebsitePreview
          website={activeWebsite}
          onRefine={handleRefine}
          isRefining={isRefining}
        />

      </main>

      {/* Footer */}
      <footer class="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
        <p>ClaudeCraft Web Engine • Desarrollador IA de precisión con Búsqueda Google en tiempo real</p>
      </footer>

      {/* Anti-Slop Guide Modal */}
      <AntiSlopModal
        isOpen={showAntiSlopModal}
        onClose={() => setShowAntiSlopModal(false)}
      />

    </div>
  );
}
