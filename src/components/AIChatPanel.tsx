import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, Wand2, RefreshCw, CheckCircle2, User, Bot, HelpCircle } from 'lucide-react';
import { GeneratedWebsite, ChatMessage } from '../types';

interface AIChatPanelProps {
  website: GeneratedWebsite;
  onRefine: (instruction: string) => void;
  isRefining: boolean;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({ website, onRefine, isRefining }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_init',
      sender: 'ai',
      text: `¡Hola! Soy tu desarrollador IA nivel Claude. He creado la primera versión de "${website.title}".\n\nPuedes seguir chateando conmigo para hacerme cualquier comentario, sugerencia o cambio sobre la página (por ejemplo: "Agrega una sección de precios", "Cambia el estilo de los botones", "Agrega más noticias de IA"). ¿Qué te gustaría modificar?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isRefining) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Trigger refinement API call
    onRefine(query);

    // Append temporary AI response message
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: `Entendido. Estoy aplicando la modificación "${query}" quirúrgicamente en el código HTML/CSS/JS de la página sin alterar la estructura existente...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRefinement: true,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  const quickPrompts = [
    'Añadir sección de Testimonios y Reseñas de Usuarios',
    'Agregar una tabla de precios con 3 planes',
    'Cambiar el color del botón principal a verde esmeralda',
    'Añadir un formulario de contacto con validación',
    'Agregar una sección de Preguntas Frecuentes (FAQ)',
    'Añadir un selector de modo claro / modo oscuro'
  ];

  return (
    <div class="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[620px] text-xs">
      
      {/* Header */}
      <div class="bg-zinc-900 border-b border-zinc-800 px-5 py-3.5 flex items-center justify-between">
        <div class="flex items-center space-x-2.5">
          <div class="p-2 rounded-xl bg-emerald-950 border border-emerald-800/80 text-emerald-400">
            <MessageSquare class="w-4 h-4" />
          </div>
          <div>
            <h3 class="font-bold text-white text-sm">Chat Continuo con el Desarrollador IA</h3>
            <p class="text-[11px] text-zinc-400">Comenta, pide cambios o perfecciona la página en tiempo real</p>
          </div>
        </div>

        <div class="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full text-[11px] text-emerald-300">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>IA Lista para Comentarios</span>
        </div>
      </div>

      {/* Messages Scroll Body */}
      <div class="flex-1 p-4 overflow-y-auto space-y-3.5 bg-zinc-950">
        {messages.map((msg) => (
          <div
            key={msg.id}
            class={`flex gap-3 max-w-2xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              class={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-[11px] ${
                msg.sender === 'user' ? 'bg-indigo-600' : 'bg-emerald-900 border border-emerald-700'
              }`}
            >
              {msg.sender === 'user' ? <User class="w-4 h-4" /> : <Bot class="w-4 h-4 text-emerald-300" />}
            </div>

            <div
              class={`rounded-2xl p-3.5 text-xs leading-relaxed space-y-1 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
              }`}
            >
              <div class="flex items-center justify-between gap-4 border-b border-white/10 pb-1 mb-1.5 text-[10px] opacity-80">
                <span class="font-semibold">{msg.sender === 'user' ? 'Tú (Creador)' : 'Desarrollador IA'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p class="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}

        {isRefining && (
          <div class="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-emerald-300 text-xs animate-pulse">
            <RefreshCw class="w-4 h-4 animate-spin text-emerald-400 shrink-0" />
            <span>Refinando la página web en tiempo real con Gemini AI...</span>
          </div>
        )}
      </div>

      {/* Quick Suggestion Chips */}
      <div class="p-3 bg-zinc-900/90 border-t border-zinc-800 overflow-x-auto flex items-center gap-2">
        <span class="text-[10px] text-zinc-500 font-semibold shrink-0 uppercase tracking-wider">Sugerencias:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            disabled={isRefining}
            class="bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition cursor-pointer shrink-0"
          >
            + {qp}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div class="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu comentario o cambio deseado para la página (ej: 'Agrégale un botón flotante')..."
          disabled={isRefining}
          class="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isRefining}
          class="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
        >
          {isRefining ? <RefreshCw class="w-4 h-4 animate-spin" /> : <Send class="w-4 h-4" />}
          <span class="hidden sm:inline">Enviar</span>
        </button>
      </div>

    </div>
  );
};
