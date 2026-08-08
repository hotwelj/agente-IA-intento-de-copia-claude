import React, { useState } from 'react';
import { Copy, Download, Check, Code, FileText, Send, Sparkles } from 'lucide-react';
import { GeneratedWebsite } from '../types';

interface CodeInspectorProps {
  website: GeneratedWebsite;
  onRefine: (instruction: string) => void;
  isRefining: boolean;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ website, onRefine, isRefining }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState('');

  const files = website.files && website.files.length > 0 ? website.files : [
    {
      path: 'index.html',
      language: 'html',
      content: website.previewHtml
    }
  ];

  const currentFile = files[activeFileIndex] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentFile.content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFile.path || 'website.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementPrompt.trim() || isRefining) return;
    onRefine(refinementPrompt);
    setRefinementPrompt('');
  };

  return (
    <div id="code-inspector" class="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[620px] text-zinc-100">
      
      {/* File Tabs & Actions Header */}
      <div class="bg-zinc-900/90 border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between overflow-x-auto">
        <div class="flex items-center space-x-1.5 overflow-x-auto shrink-0">
          {files.map((file, idx) => (
            <button
              key={file.path}
              onClick={() => setActiveFileIndex(idx)}
              class={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeFileIndex === idx
                  ? 'bg-zinc-800 text-indigo-300 font-semibold border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <FileText class="w-3.5 h-3.5" />
              <span>{file.path}</span>
            </button>
          ))}
        </div>

        <div class="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleCopy}
            class="flex items-center space-x-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            title="Copiar código al portapapeles"
          >
            {copied ? <Check class="w-3.5 h-3.5 text-emerald-400" /> : <Copy class="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            onClick={handleDownload}
            class="flex items-center space-x-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1.5 rounded-lg transition cursor-pointer shadow-sm"
            title="Descargar archivo HTML"
          >
            <Download class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Descargar HTML</span>
          </button>
        </div>
      </div>

      {/* Code Viewer Body */}
      <div class="flex-1 overflow-auto p-4 bg-zinc-950 font-mono text-xs text-zinc-300 leading-relaxed selection:bg-indigo-900 selection:text-indigo-200">
        <pre class="whitespace-pre-wrap break-all">{currentFile.content}</pre>
      </div>

      {/* Refinement Prompt Bar */}
      <div class="border-t border-zinc-800 p-3 bg-zinc-900/90">
        <form onSubmit={handleRefineSubmit} class="flex items-center space-x-2">
          <div class="relative flex-1">
            <input
              type="text"
              value={refinementPrompt}
              onChange={(e) => setRefinementPrompt(e.target.value)}
              placeholder="Refinar con IA: Ej. 'Aumenta el tamaño del título', 'Cambia el fondo a modo oscuro cálido', 'Añade una sección de preguntas frecuentes'..."
              disabled={isRefining}
              class="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={!refinementPrompt.trim() || isRefining}
            class={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
              !refinementPrompt.trim() || isRefining
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isRefining ? (
              <Sparkles class="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send class="w-3.5 h-3.5" />
            )}
            <span>Refinar</span>
          </button>
        </form>
      </div>

    </div>
  );
};
