import React from 'react';
import { NavigationSection } from '../types';

interface SidebarProps {
  currentSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentSection, onNavigate }) => {
  const navItems: { id: NavigationSection; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Tablero', icon: 'dashboard' },
    { id: 'projects', label: 'Proyectos', icon: 'folder_copy' },
    { id: 'products', label: 'Productos', icon: 'inventory_2' },
    { id: 'templates', label: 'Plantillas', icon: 'description' },
    { id: 'ai-assets', label: 'Activos IA', icon: 'psychology' },
    { id: 'preview', label: 'Vista Previa', icon: 'visibility' },
    { id: 'sync', label: 'Sincronización', icon: 'sync' },
    { id: 'export', label: 'Exportación', icon: 'export_notes' },
    { id: 'wizard', label: 'Asistente Rápido', icon: 'magic_button' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#fbf9f5] border-r border-[#eae8e4] flex flex-col p-6 gap-2 z-50 select-none">
      {/* Brand Header */}
      <div 
        onClick={() => onNavigate('dashboard')}
        className="flex items-center gap-3 mb-6 px-2 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-[#af101a] text-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined filled-icon text-[24px]">dataset</span>
        </div>
        <div>
          <h1 className="font-geist text-[18px] font-bold text-[#af101a] leading-tight">Catálogo IA</h1>
          <p className="text-[10px] font-geist font-bold text-[#5f5e5e] uppercase tracking-widest opacity-80">NÚCLEO EMPRESARIAL</p>
        </div>
      </div>

      {/* Primary Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-geist text-[14px] transition-all text-left ${
                isActive
                  ? 'bg-[#d32f2f] text-white font-bold shadow-sm scale-[0.99]'
                  : 'text-[#5f5e5e] hover:bg-[#eae8e4] hover:text-[#1b1c1a]'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'filled-icon text-white' : ''}`}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings Footer */}
      <div className="mt-auto pt-4 border-t border-[#eae8e4] flex flex-col gap-3">
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-geist text-[14px] transition-all text-left ${
            currentSection === 'settings'
              ? 'bg-[#d32f2f] text-white font-bold shadow-sm'
              : 'text-[#5f5e5e] hover:bg-[#eae8e4] hover:text-[#1b1c1a]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Ajustes</span>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaGdjMyLHzKLRGzdDWW9sGKY0j1ct1gTY76nGI5eJubhzO2zaGy0_YMdIfT7RFnq8SOjmkA_1uQuTKoGclKAK8ZJ1s25wWHzMoKpzc73IgL09c6yUkDq2hYqSmXf9Nfq3FyYuBnRMQxJrRne1yhLHYFjIx2wU0kU5xfiIEmbGKy_wtzt8xMpy5e8ZLtELZzqkH4_yjA-b9qS4FsNwsIUwAlsntdLiitlCwki_L_oNgWhqiDpR0dkA3V0skqDrvsXo75Jl27P4OPeFW"
            alt="Alex Rivera"
            className="w-8 h-8 rounded-full border border-[#e4beba] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#1b1c1a] truncate leading-tight">Alex Rivera</p>
            <p className="text-[10px] text-[#5f5e5e] truncate">Admin Global</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
