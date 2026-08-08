import React from 'react';
import { X, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface AntiSlopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AntiSlopModal: React.FC<AntiSlopModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rules = [
    {
      title: '1. Cero Textos Clichés de IA',
      desc: 'Prohibidas las palabras de relleno como "supercharge", "empower", "revolutionize" o frases infladas que revelan inmediatamente que la web fue hecha por una IA genérica.'
    },
    {
      title: '2. Prohibido el "Modo Oscuro Púrpura/Cian"',
      desc: 'No se generan tarjetas oscuras genéricas con bordes neón fosforescentes brillantes. Se utilizan tonos Warm Titanium u Off-White sobrios de alta gama.'
    },
    {
      title: '3. Jerarquía Tipográfica Matemática',
      desc: 'Sistemas de fuentes emparejadas intencionalmente con escalas de paso de al menos 1.25. Títulos claros y lectura fluida con interlineado 1.5-1.7.'
    },
    {
      title: '4. Búsqueda en Tiempo Real Integrada',
      desc: 'Capacidad de incluir módulos con búsqueda activa conectada a Google Grounding para datos, noticias y hechos del mundo real sin alucinaciones.'
    },
    {
      title: '5. Proporciones y Radios de Borde Calculados',
      desc: 'Si hay un contenedor dentro de otro, el radio interior cumple: Radio Interior = Radio Exterior - Padding.'
    },
    {
      title: '6. Sin Tarjetas Anidadas Repetitivas',
      desc: 'Se evita la estructura aburrida de cuadrículas de 3 columnas idénticas. Se utiliza espacio negativo y tipografía como separador visual.'
    },
    {
      title: '7. Textos de Botón en Una Sola Línea',
      desc: 'Las etiquetas dentro de botones o pastillas nunca se rompen o trunca en dos líneas.'
    },
    {
      title: '8. Metodología de Razonamiento Paso a Paso',
      desc: 'Cada generación sigue un pipeline riguroso: Análisis UX -> Escala Tipográfica -> Arquitectura -> Integración de Búsqueda -> Código Limpio.'
    },
    {
      title: '9. Código Modular y Limpio',
      desc: 'HTML5 semántico con Tailwind CSS nativo, libre de clases basura o estilos redundantes inline.'
    },
    {
      title: '10. Búsqueda con Fuentes Verificadas',
      desc: 'Las aplicaciones web que requieran información en tiempo real incluyen enlaces directos y citas transparentes a fuentes primarias.'
    }
  ];

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col text-zinc-100 shadow-2xl">
        
        {/* Header */}
        <div class="bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <div class="p-2 rounded-lg bg-emerald-950 border border-emerald-800/60 text-emerald-400">
              <ShieldCheck class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Manifiesto Anti-AI Slop & Nivel Claude</h3>
              <p class="text-xs text-zinc-400">Estándares para construir páginas web que no parezcan hechas por IA</p>
            </div>
          </div>

          <button
            onClick={onClose}
            class="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div class="p-6 overflow-y-auto space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {rules.map((item, idx) => (
              <div key={idx} class="bg-zinc-950 border border-zinc-800/80 p-3.5 rounded-xl space-y-1">
                <div class="flex items-center space-x-2 text-emerald-400 font-semibold">
                  <CheckCircle2 class="w-3.5 h-3.5 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p class="text-zinc-400 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div class="bg-zinc-950 border-t border-zinc-800 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2 rounded-xl transition cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
