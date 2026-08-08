export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primaryHex: string;
  bgHex: string;
  fontHeader: string;
  fontBody: string;
  badge: string;
  antiSlopHighlight: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'sophisticated-dark',
    name: 'Sophisticated Dark (Recomendado)',
    description: 'Titanio mate, fondo obsidiana #0a0a0b, acentos esmeralda y alto contraste sobrio.',
    primaryHex: '#10b981',
    bgHex: '#0a0a0b',
    fontHeader: 'Plus Jakarta Sans, sans-serif',
    fontBody: 'Inter, sans-serif',
    badge: 'Oscuro de Lujo',
    antiSlopHighlight: 'Sin morados/neones fosforescentes; paleta militar y titanio mate.'
  },
  {
    id: 'off-white',
    name: 'Off-White Warm (Lino Blanco & Carbón)',
    description: 'Lino cálido #faf9f6 con texto carbón #18181b y bordes sutiles.',
    primaryHex: '#18181b',
    bgHex: '#faf9f6',
    fontHeader: 'Plus Jakarta Sans, sans-serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    badge: 'Clásico Cálido',
    antiSlopHighlight: 'Espaciado generoso con lino natural en lugar de blancos deslumbrantes.'
  },
  {
    id: 'emerald-cyber',
    name: 'Emerald Cyber Minimal',
    description: 'Verde esmeralda profundo #047857 con fondo ciber negro #09090b e indicadores LED.',
    primaryHex: '#059669',
    bgHex: '#09090b',
    fontHeader: 'JetBrains Mono, monospace',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    badge: 'Tech Cyber',
    antiSlopHighlight: 'Diseño terminal de alta precisión sin estética barata de cibercafé.'
  },
  {
    id: 'nordic-light',
    name: 'Nordic Light & Crisp',
    description: 'Blanco escandinavo #f4f4f5 con acentos azul glaciar #0284c7 y tarjetas limpia.',
    primaryHex: '#0284c7',
    bgHex: '#f4f4f5',
    fontHeader: 'Inter, sans-serif',
    fontBody: 'Inter, sans-serif',
    badge: 'Escandinavo',
    antiSlopHighlight: 'Sombra suave con bordes de 1px perfeccionados matemáticamente.'
  },
  {
    id: 'warm-paper',
    name: 'Warm Paper & Ink (Sepia Antiguo)',
    description: 'Textura de papel sepia #fdfbf7 con tinta de periódico #27272a.',
    primaryHex: '#27272a',
    bgHex: '#fdfbf7',
    fontHeader: 'Newsreader, Georgia, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    badge: 'Editorial',
    antiSlopHighlight: 'Apariencia de libro impreso con jerarquía tipográfica clásica.'
  },
  {
    id: 'editorial-serif',
    name: 'Editorial Serif Deluxe',
    description: 'Blanco puro con serifs elegantes tipo revista Vogue/Monocle.',
    primaryHex: '#000000',
    bgHex: '#ffffff',
    fontHeader: 'Playfair Display, Georgia, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    badge: 'Lujo Minimalista',
    antiSlopHighlight: 'Sistemas de cuadrícula asimétricos con espacio negativo expresivo.'
  },
  {
    id: 'retro-synthwave',
    name: 'Retro Synthwave Dark (Titanio & Púrpura)',
    description: 'Negro místico #0f0e17 con acentos violeta titanio #a78bfa sobrios.',
    primaryHex: '#a78bfa',
    bgHex: '#0f0e17',
    fontHeader: 'Space Grotesk, sans-serif',
    fontBody: 'Inter, sans-serif',
    badge: 'Retro Elegante',
    antiSlopHighlight: 'Tonos violeta mate atenuados sin saturaciones neón molestas.'
  },
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalist High Contrast',
    description: 'Amarillo vibrante #facc15 con bordes negros sólidos y tarjetas de alto impacto.',
    primaryHex: '#facc15',
    bgHex: '#fafafa',
    fontHeader: 'Plus Jakarta Sans, sans-serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    badge: 'Neo-Brutalismo',
    antiSlopHighlight: 'Sombra plana sin difuminar con trazados negros nítidos.'
  },
  {
    id: 'custom-builder',
    name: '🛠️ Creador de Temas Personalizado',
    description: 'Diseña tu propia paleta: elige color primario, fondo, fuente y bordes.',
    primaryHex: '#6366f1',
    bgHex: '#0f172a',
    fontHeader: 'Custom',
    fontBody: 'Custom',
    badge: 'Personalizado',
    antiSlopHighlight: 'Construye la identidad corporativa exacta para tu proyecto.'
  }
];
