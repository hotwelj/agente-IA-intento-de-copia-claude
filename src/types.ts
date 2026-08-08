export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SearchResult {
  text: string;
  groundingChunks: GroundingChunk[];
  searchQueries?: string[];
  isLoading?: boolean;
  error?: string;
}

export interface DevStep {
  step: number;
  title: string;
  detail: string;
  status: 'pending' | 'active' | 'done';
}

export interface DesignSystem {
  primaryColor: string;
  backgroundColor: string;
  fontHeader: string;
  fontBody: string;
  spacingRatio: string;
  antiSlopRulesApplied: string[];
}

export interface WebFile {
  path: string;
  language: string;
  content: string;
}

export interface GeneratedWebsite {
  id: string;
  title: string;
  tagline: string;
  category: 'landing' | 'portfolio' | 'saas' | 'search-app' | 'dashboard' | 'editorial' | 'custom';
  hasRealtimeSearch: boolean;
  stepLog: DevStep[];
  designSystem: DesignSystem;
  files: WebFile[];
  previewHtml: string;
  searchConfig?: {
    defaultQuery: string;
    placeholder: string;
    searchType: 'news' | 'market' | 'general' | 'facts' | 'places';
  };
  createdAt: string;
  promptUsed: string;
}

export type StylePresetKey =
  | 'sophisticated-dark'
  | 'off-white'
  | 'emerald-cyber'
  | 'nordic-light'
  | 'warm-paper'
  | 'editorial-serif'
  | 'retro-synthwave'
  | 'neo-brutalist'
  | 'custom-builder';

export interface CustomThemeConfig {
  themeName: string;
  primaryHex: string;
  bgHex: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'display';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export interface GenerationOptions {
  enableRealtimeSearch: boolean;
  websiteType: 'landing' | 'portfolio' | 'saas' | 'search-app' | 'dashboard' | 'editorial' | 'custom';
  stylePreset: StylePresetKey;
  customTheme?: CustomThemeConfig;
  customInstructions?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isRefinement?: boolean;
}
