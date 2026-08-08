import React from 'react';
import { CheckCircle2, CircleDashed, Loader2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { DevStep } from '../types';

interface DevReasoningLogProps {
  steps: DevStep[];
  isGenerating?: boolean;
}

export const DevReasoningLog: React.FC<DevReasoningLogProps> = ({ steps, isGenerating }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  if (!steps || steps.length === 0) return null;

  return (
    <div id="dev-reasoning-log" class="bg-[#0d0d0e] border border-[#262626] rounded-2xl p-4 sm:p-5 mb-6 text-[#e5e5e7] shadow-md">
      
      {/* Header */}
      <div class="flex items-center justify-between cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
        <div class="flex items-center space-x-2.5">
          <div class="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50">
            <Sparkles class="w-4 h-4" />
          </div>
          <div>
            <h3 class="text-xs font-semibold text-white flex items-center space-x-2">
              <span>Metodología de Desarrollo Paso a Paso</span>
              <span class="text-[10px] font-mono font-medium bg-[#18181b] text-emerald-300 border border-[#262626] px-2 py-0.5 rounded-full">
                Nivel Claude
              </span>
            </h3>
            <p class="text-[11px] text-[#a1a1aa]">Paso a paso ejecutable sin saltar ningún detalle técnico ni visual</p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          {isGenerating && (
            <span class="flex items-center space-x-1.5 text-xs text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/50 animate-pulse font-mono">
              <Loader2 class="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Ejecutando...</span>
            </span>
          )}
          <button class="text-[#71717a] hover:text-white p-1">
            {isExpanded ? <ChevronUp class="w-4 h-4" /> : <ChevronDown class="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Steps List */}
      {isExpanded && (
        <div class="mt-4 pt-3 border-t border-[#262626] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {steps.map((step) => (
            <div
              key={step.step}
              class={`p-3 rounded-xl border text-xs transition ${
                step.status === 'done'
                  ? 'bg-[#0a0a0b] border-[#262626]'
                  : step.status === 'active'
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                  : 'bg-[#0a0a0b]/40 border-[#262626]/50 text-[#71717a]'
              }`}
            >
              <div class="flex items-center justify-between mb-1.5">
                <span class="font-mono text-[10px] uppercase tracking-wider text-[#71717a]">
                  PASO {step.step}
                </span>
                {step.status === 'done' ? (
                  <CheckCircle2 class="w-3.5 h-3.5 text-emerald-400" />
                ) : step.status === 'active' ? (
                  <Loader2 class="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                ) : (
                  <CircleDashed class="w-3.5 h-3.5 text-[#52525b]" />
                )}
              </div>
              <h4 class="font-semibold text-white mb-1">{step.title}</h4>
              <p class="text-[#a1a1aa] text-[11px] leading-relaxed line-clamp-3">{step.detail}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
