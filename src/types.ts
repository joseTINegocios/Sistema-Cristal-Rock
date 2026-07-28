export type NavigationSection = 
  | 'dashboard' 
  | 'projects' 
  | 'products' 
  | 'templates' 
  | 'ai-assets' 
  | 'preview' 
  | 'sync' 
  | 'export'
  | 'settings';

export type AIAssetsSubView = 'library' | 'cover-generator' | 'icon-designer' | 'extractor';

export interface Project {
  id: string;
  name: string;
  status: 'Syncing' | 'Published' | 'Draft';
  lastUpdate: string;
  productsCount: number;
  pagesCount: number;
  image: string;
  dataSources: string[];
  templates: { name: string; tag: string };
  aiAssets: { code: string; label: string; bg: string }[];
}

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: string;
  brand: string;
  price: number;
  status: 'Active' | 'Review' | 'Out of Stock';
  updated: string;
  catalogsCount: number[];
  image: string;
  details?: {
    lastManualUpdate?: string;
    wholesalePrice?: number;
    leadTime?: string;
    affectedCatalogs?: { title: string; page: string; feature?: boolean }[];
  };
}

export interface TemplateVariable {
  tag: string;
  sourceSystem: string;
  fieldMapping: string;
  fallbackValue: string;
  status: 'Validated' | 'Analyzing' | 'Pending';
}

export interface AIAssetItem {
  id: string;
  title: string;
  version: string;
  category: 'Backgrounds' | 'Campaigns' | 'Icons' | 'Product Frames';
  format: string;
  updated: string;
  image: string;
  isAIGenerated?: boolean;
  status?: 'Verified' | 'In Draft';
}

export interface SyncConnection {
  id: string;
  name: string;
  subtitle: string;
  type: 'api' | 'postgres' | 'sap' | 'excel';
  status: 'Active' | 'Error' | 'Idle';
  lastSync: string;
  recordsCount?: string;
  errorMessage?: string;
}

export interface ExportHistoryItem {
  id: string;
  filename: string;
  date: string;
  size: string;
  status: 'Success' | 'Processing' | 'Failed';
  progress?: number;
  error?: string;
  type: 'pdf' | 'png' | 'zip';
}
