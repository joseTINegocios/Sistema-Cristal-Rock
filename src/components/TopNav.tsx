import React from 'react';
import { NavigationSection, AIAssetsSubView } from '../types';

interface TopNavProps {
  currentSection: NavigationSection;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  aiSubView?: AIAssetsSubView;
  onAISubViewChange?: (subView: AIAssetsSubView) => void;
  onQuickAction?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentSection,
  searchQuery,
  onSearchChange,
  aiSubView,
  onAISubViewChange,
  onQuickAction,
}) => {
  const getSectionTitle = () => {
    switch (currentSection) {
      case 'dashboard':
        return 'Catalog Manager';
      case 'projects':
        return 'Catalog Manager';
      case 'products':
        return 'Catalog Manager';
      case 'templates':
        return 'Catalog Manager';
      case 'ai-assets':
        return 'Catalog Manager';
      case 'preview':
        return 'Catalog Manager';
      case 'sync':
        return 'Catalog Manager';
      case 'export':
        return 'Centro de Exportación';
      case 'settings':
        return 'Ajustes de Catálogo';
      default:
        return 'Gestor de Catálogo';
    }
  };

  const getBreadcrumb = () => {
    switch (currentSection) {
      case 'templates':
        return 'Inicio / Plantillas / Winter_Catalog_2024.indd';
      case 'preview':
        return 'Colección Invierno 2024';
      default:
        return null;
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#fbf9f5]/80 backdrop-blur-md border-b border-[#eae8e4] z-40 px-8 flex items-center justify-between shadow-sm">
      {/* Title & Breadcrumbs / Sub-tabs */}
      <div className="flex items-center gap-6">
        <h1 className="font-geist text-[20px] font-bold text-[#af101a] whitespace-nowrap">
          {getSectionTitle()}
        </h1>

        {getBreadcrumb() && (
          <div className="hidden md:flex items-center gap-2 text-xs text-[#5f5e5e] border-l border-[#e4beba] pl-4">
            <span>{getBreadcrumb()}</span>
          </div>
        )}

        {/* Sub-nav tabs for AI Assets view */}
        {currentSection === 'ai-assets' && onAISubViewChange && (
          <nav className="hidden lg:flex items-center gap-6 ml-2 border-l border-[#eae8e4] pl-6 text-sm">
            <button
              onClick={() => onAISubViewChange('library')}
              className={`pb-1 transition-all ${
                aiSubView === 'library'
                  ? 'text-[#af101a] font-bold border-b-2 border-[#af101a]'
                  : 'text-[#5f5e5e] hover:text-[#af101a]'
              }`}
            >
              Biblioteca de Activos
            </button>
            <button
              onClick={() => onAISubViewChange('cover-generator')}
              className={`pb-1 transition-all ${
                aiSubView === 'cover-generator'
                  ? 'text-[#af101a] font-bold border-b-2 border-[#af101a]'
                  : 'text-[#5f5e5e] hover:text-[#af101a]'
              }`}
            >
              Generador de Portadas
            </button>
            <button
              onClick={() => onAISubViewChange('icon-designer')}
              className={`pb-1 transition-all ${
                aiSubView === 'icon-designer'
                  ? 'text-[#af101a] font-bold border-b-2 border-[#af101a]'
                  : 'text-[#5f5e5e] hover:text-[#af101a]'
              }`}
            >
              Diseñador de Iconos
            </button>
            <button
              onClick={() => onAISubViewChange('extractor')}
              className={`pb-1 transition-all ${
                aiSubView === 'extractor'
                  ? 'text-[#af101a] font-bold border-b-2 border-[#af101a]'
                  : 'text-[#5f5e5e] hover:text-[#af101a]'
              }`}
            >
              Extractor de Componentes
            </button>
          </nav>
        )}
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-6 relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5f5e5e] text-[18px]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar catálogos, activos, productos..."
          className="w-full bg-[#f5f3ef] border border-[#e4beba]/60 rounded-full py-1.5 pl-10 pr-4 text-xs text-[#1b1c1a] focus:ring-2 focus:ring-[#af101a]/20 focus:border-[#af101a] outline-none transition-all"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        <button 
          title="Notificaciones" 
          className="relative p-2 text-[#5f5e5e] hover:text-[#af101a] hover:bg-[#eae8e4] rounded-full transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#af101a] rounded-full border-2 border-white"></span>
        </button>

        <button 
          title="Ayuda y Soporte" 
          className="p-2 text-[#5f5e5e] hover:text-[#af101a] hover:bg-[#eae8e4] rounded-full transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">help_outline</span>
        </button>

        {onQuickAction && (
          <button
            onClick={onQuickAction}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#af101a] text-white rounded-lg font-geist font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Nuevo Elemento</span>
          </button>
        )}

        <div className="pl-3 border-l border-[#eae8e4] flex items-center gap-3">
          <div className="text-right hidden xl:block">
            <p className="text-xs font-bold text-[#1b1c1a]">Alex Rivera</p>
            <p className="text-[10px] text-[#5f5e5e] uppercase tracking-wider">Admin de Catálogo</p>
          </div>
          <div className="w-9 h-9 rounded-full border-2 border-[#e4beba] overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9qjXEmziOTSVopAmu5BjhIxNyf2fgb6I2GX_r5LWEXhCLiR8TRkTb4A4ihXMFtHlgtpI1o3H9vxXwqL2nHt2mr96GHt7gOGgJYhVHGF7FQMc3mvO3H2UEQ_f35tllhgiA3FzrGL_rkW-aXNUJVOAf7Js5N2UvFIjqW5NDDBV4Bq2MC4wswMz5ukmE2Gpbp4EBSiHsrYntDF19jXVExwaVg5Uejb4idb1ldKvBOAx01VixQGQ6UH55gSurHwsw8Ej5F1U24TpR917d"
              alt="Alex Rivera Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
