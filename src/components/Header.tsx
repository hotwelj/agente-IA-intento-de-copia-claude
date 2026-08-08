import React from 'react';
import { ShieldCheck, Globe, Code2 } from 'lucide-react';

interface HeaderProps {
  onOpenAntiSlopModal: () => void;
  geminiConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAntiSlopModal, geminiConnected }) => {
  return (
    <header id="main-header" class="border-b border-[#262626] bg-[#0a0a0b]/95 backdrop-blur sticky top-0 z-40 text-[#e5e5e7]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-lg bg-[#18181b] border border-[#3f3f46] flex items-center justify-center text-white font-bold shadow-md">
            <Code2 class="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-sm font-bold text-white tracking-tight">ClaudeCraft Web Studio</h1>
              <span class="text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                Sophisticated Dark
              </span>
            </div>
            <p class="text-xs text-[#a1a1aa] hidden sm:block">Desarrollador IA de precisión con Búsqueda Google Grounding en vivo</p>
          </div>
        </div>

        {/* Right Action & Indicators */}
        <div class="flex items-center space-x-3">
          
          {/* Status badge */}
          <div class="hidden md:flex items-center space-x-2 bg-[#0d0d0e] border border-[#262626] px-3 py-1.5 rounded-lg text-xs">
            <span class={`w-2 h-2 rounded-full ${geminiConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span class="text-white font-medium">Gemini 3.6 Flash</span>
            <span class="text-[#3f3f46]">|</span>
            <Globe class="w-3.5 h-3.5 text-emerald-400" />
            <span class="text-[#a1a1aa]">Google Grounding</span>
          </div>

          {/* Anti Slop Manifesto Trigger */}
          <button
            onClick={onOpenAntiSlopModal}
            class="flex items-center space-x-1.5 text-xs font-medium bg-[#18181b] hover:bg-[#27272a] text-white border border-[#3f3f46] px-3.5 py-1.5 rounded-lg transition cursor-pointer"
            title="Ver los 10 Mandamientos Anti-Slop de Desarrollo Claude"
          >
            <ShieldCheck class="w-4 h-4 text-emerald-400" />
            <span class="hidden sm:inline">Guía Anti-AI Slop</span>
          </button>
        </div>

      </div>
    </header>
  );
};
