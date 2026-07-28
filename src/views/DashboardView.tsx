import React, { useState, useEffect } from 'react';
import { NavigationSection } from '../types';

interface DashboardViewProps {
  onNavigate: (section: NavigationSection) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [timeStr, setTimeStr] = useState('');
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        `Estado del sistema al ${now.toLocaleDateString('es-ES', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })} a las ${now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleForceSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-geist text-[32px] font-semibold text-[#1b1c1a] tracking-tight">
            Resumen de Inteligencia
          </h2>
          <p className="text-[#5f5e5e] text-sm mt-1">{timeStr || 'Cargando estado del sistema...'}</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-[#af101a]/10 text-[#af101a] border border-[#af101a]/20 rounded-full text-xs font-bold gap-1.5">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Motor IA: Activo
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-[#f1f5ff] text-[#49596e] border border-[#617188]/20 rounded-full text-xs font-bold gap-1.5">
            <span className="material-symbols-outlined text-[14px]">database</span>
            8 Fuentes Conectadas
          </span>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Health Card (Span 8) */}
        <div className="lg:col-span-8 bg-white border border-[#E5E1DA] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[340px] shadow-sm hover:shadow-md transition-shadow">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-geist text-[24px] font-semibold text-[#1b1c1a]">Salud del Catálogo</h3>
                <p className="text-[#5f5e5e] text-xs">Rendimiento agregado en 24 nodos globales</p>
              </div>
              <div className="bg-[#f5f3ef] p-2 rounded-lg border border-[#eae8e4]">
                <span className="material-symbols-outlined text-[#af101a]">analytics</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col">
                <span className="text-[#5f5e5e] text-[11px] font-bold uppercase tracking-wider mb-1">
                  Conectados
                </span>
                <span className="text-4xl font-geist font-bold text-[#1b1c1a]">142</span>
                <div className="w-full h-1.5 bg-[#eae8e4] rounded-full mt-3 overflow-hidden">
                  <div className="w-[88%] h-full bg-[#1b5e20] rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[#5f5e5e] text-[11px] font-bold uppercase tracking-wider mb-1">
                  Sincronizados
                </span>
                <span className="text-4xl font-geist font-bold text-[#1b1c1a]">128</span>
                <div className="w-full h-1.5 bg-[#eae8e4] rounded-full mt-3 overflow-hidden">
                  <div className="w-[72%] h-full bg-[#af101a] rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[#5f5e5e] text-[11px] font-bold uppercase tracking-wider mb-1">
                  Pendientes
                </span>
                <span className="text-4xl font-geist font-bold text-[#1b1c1a]">14</span>
                <div className="w-full h-1.5 bg-[#eae8e4] rounded-full mt-3 overflow-hidden">
                  <div className="w-[12%] h-full bg-amber-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Bar Chart Pattern */}
          <div className="h-20 w-full mt-4 relative">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-t from-[#af101a] to-transparent rounded-lg"></div>
            <div className="absolute bottom-0 w-full h-16 flex items-end justify-between px-2 gap-1.5">
              <div className="flex-1 bg-[#af101a]/20 rounded-t-sm h-[40%] hover:bg-[#af101a]/40 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/30 rounded-t-sm h-[55%] hover:bg-[#af101a]/50 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/20 rounded-t-sm h-[35%] hover:bg-[#af101a]/40 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/40 rounded-t-sm h-[70%] hover:bg-[#af101a]/60 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/30 rounded-t-sm h-[60%] hover:bg-[#af101a]/50 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/50 rounded-t-sm h-[85%] hover:bg-[#af101a]/70 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/40 rounded-t-sm h-[75%] hover:bg-[#af101a]/60 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/60 rounded-t-sm h-[95%] hover:bg-[#af101a]/80 transition-colors"></div>
              <div className="flex-1 bg-[#af101a]/20 rounded-t-sm h-[40%] hover:bg-[#af101a]/40 transition-colors"></div>
            </div>
          </div>
        </div>

        {/* Sync Status Ring (Span 4) */}
        <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a]">Sincronización</h3>
            <span 
              onClick={() => onNavigate('sync')} 
              className="material-symbols-outlined text-[#5f5e5e] text-sm cursor-pointer hover:text-[#af101a]"
            >
              history
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center py-4">
            <div className="relative mb-3">
              <svg className="w-28 h-32 transform -rotate-90">
                <circle
                  className="text-[#eae8e4]"
                  cx="56"
                  cy="56"
                  fill="transparent"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="text-[#af101a]"
                  cx="56"
                  cy="56"
                  fill="transparent"
                  r="48"
                  stroke="currentColor"
                  strokeDasharray="301.5"
                  strokeDashoffset="36"
                  strokeWidth="8"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-geist text-[#1b1c1a]">88%</span>
                <span className="text-[10px] text-[#5f5e5e] font-bold uppercase tracking-wider">Óptimo</span>
              </div>
            </div>
            <p className="text-xs text-center text-[#5f5e5e]">
              Próxima sincronización programada en <span className="text-[#af101a] font-bold">14m 22s</span>
            </p>
          </div>

          <button
            onClick={handleForceSync}
            disabled={syncing}
            className="w-full py-2.5 border border-[#e4beba] rounded-lg text-xs font-bold text-[#1b1c1a] hover:bg-[#f5f3ef] transition-colors flex items-center justify-center gap-2"
          >
            <span className={`material-symbols-outlined text-[18px] ${syncing ? 'animate-spin text-[#af101a]' : ''}`}>
              sync
            </span>
            <span>{syncing ? 'Sincronizando...' : 'Forzar Sincronización Manual'}</span>
          </button>
        </div>

        {/* Quick Stat Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:col-span-12 gap-4">
          <div 
            onClick={() => onNavigate('products')}
            className="bg-white border border-[#E5E1DA] rounded-xl p-4 flex flex-col gap-1 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="text-[#5f5e5e] text-[10px] font-bold uppercase tracking-wider">Total Productos</span>
              <span className="material-symbols-outlined text-[#af101a] text-[18px]">inventory_2</span>
            </div>
            <span className="text-2xl font-geist font-bold text-[#1b1c1a]">24.8k</span>
            <span className="text-[10px] text-[#1b5e20] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> +12% respecto al mes anterior
            </span>
          </div>

          <div 
            onClick={() => onNavigate('sync')}
            className="bg-white border border-[#E5E1DA] rounded-xl p-4 flex flex-col gap-1 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="text-[#5f5e5e] text-[10px] font-bold uppercase tracking-wider">APIs Conectadas</span>
              <span className="material-symbols-outlined text-[#af101a] text-[18px]">api</span>
            </div>
            <span className="text-2xl font-geist font-bold text-[#1b1c1a]">18</span>
            <span className="text-[10px] text-[#5f5e5e] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">check_circle</span> Todos los sistemas operativos
            </span>
          </div>

          <div 
            onClick={() => onNavigate('sync')}
            className="bg-white border border-[#E5E1DA] rounded-xl p-4 flex flex-col gap-1 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="text-[#5f5e5e] text-[10px] font-bold uppercase tracking-wider">Fuentes Excel</span>
              <span className="material-symbols-outlined text-[#af101a] text-[18px]">table_chart</span>
            </div>
            <span className="text-2xl font-geist font-bold text-[#1b1c1a]">42</span>
            <span className="text-[10px] text-[#af101a] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">warning</span> 2 requieren re-autenticación
            </span>
          </div>

          <div 
            onClick={() => onNavigate('templates')}
            className="bg-white border border-[#E5E1DA] rounded-xl p-4 flex flex-col gap-1 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="text-[#5f5e5e] text-[10px] font-bold uppercase tracking-wider">Plantillas</span>
              <span className="material-symbols-outlined text-[#af101a] text-[18px]">description</span>
            </div>
            <span className="text-2xl font-geist font-bold text-[#1b1c1a]">156</span>
            <span className="text-[10px] text-[#5f5e5e] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">edit</span> 12 borradores en progreso
            </span>
          </div>
        </div>

        {/* Secondary Bento Layer */}
        {/* Recent Activity (Span 4) */}
        <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-xl p-6 flex flex-col h-[380px] shadow-sm">
          <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] mb-4">Actividad Reciente</h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
            <div className="flex gap-3 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#af101a] z-10 relative">
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                </div>
                <div className="absolute top-8 bottom-[-16px] left-1/2 -translate-x-1/2 w-[1px] bg-[#eae8e4]"></div>
              </div>
              <div className="flex-1 pb-4">
<p className="text-xs font-bold text-[#1b1c1a]">Sincronización Global de Productos Completa</p>
                <p className="text-[11px] text-[#5f5e5e] mb-1">Catálogo 'Summer 2024 Fashion'</p>
                <span className="text-[10px] bg-[#f5f3ef] px-2 py-0.5 rounded border border-[#eae8e4] text-[#5f5e5e]">
                   hace 2 minutos
                 </span>
              </div>
            </div>

            <div className="flex gap-3 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#49596e] z-10 relative">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <div className="absolute top-8 bottom-[-16px] left-1/2 -translate-x-1/2 w-[1px] bg-[#eae8e4]"></div>
              </div>
              <div className="flex-1 pb-4">
<p className="text-xs font-bold text-[#1b1c1a]">Generación de Activos IA</p>
                <p className="text-[11px] text-[#5f5e5e] mb-1">1,240 descripciones optimizadas por IA</p>
                <span className="text-[10px] bg-[#f5f3ef] px-2 py-0.5 rounded border border-[#eae8e4] text-[#5f5e5e]">
                   hace 1 hora
                 </span>
              </div>
            </div>

            <div className="flex gap-3 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#e2dfde] flex items-center justify-center text-[#5f5e5e] z-10 relative">
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                </div>
              </div>
              <div className="flex-1">
<p className="text-xs font-bold text-[#1b1c1a]">Exportación PDF Iniciada</p>
                <p className="text-[11px] text-[#5f5e5e] mb-1">Solicitado por Alex Rivera</p>
                <span className="text-[10px] bg-[#f5f3ef] px-2 py-0.5 rounded border border-[#eae8e4] text-[#5f5e5e]">
                   hace 3 horas
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Exported & Assets (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Generated Assets Gallery */}
          <div className="bg-white border border-[#E5E1DA] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a]">Activos Generados</h3>
              <button
                onClick={() => onNavigate('ai-assets')}
                className="text-[#af101a] text-xs font-bold hover:underline"
              >
                Ver Todos los Activos
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div 
                onClick={() => onNavigate('ai-assets')}
                className="aspect-square bg-[#f5f3ef] rounded-lg border border-dashed border-[#e4beba] flex flex-col items-center justify-center p-3 hover:border-[#af101a] transition-all cursor-pointer group"
              >
                <span className="material-symbols-outlined text-[#af101a] text-2xl mb-1 group-hover:scale-110 transition-transform">
                  add_photo_alternate
                </span>
                <span className="text-[10px] font-bold text-[#5f5e5e] uppercase tracking-wider text-center">
                  Generar Nuevo
                </span>
              </div>

              <div className="aspect-square bg-[#efeeea] rounded-lg overflow-hidden relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEg4uRc3dA-Y10H5f8GCZO4-myow2UtuVXaDRBWdZMeZVsr1qN-QOu4wtPg5EfbTtZoGBgMfBzu-TD-GMcaE0WlAHNX7WdQmG9OPd7pPBFMJ_D1C3h3PSc4szt-n4GykZYXm9s-8cA5z-dOACqsolWy5PAaC9UONmMjJHeEcWAoGKKkSF3VBEcdll_tRndz1tMyMUqLsKMESRMFjBJMhBO03mVCpPszMPwGffkMp_aztvw-LbmPfnXV6kgWZKR3eLh473seX518gzt"
                  alt="3D render setup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => onNavigate('preview')} className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#af101a]">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>

              <div className="aspect-square bg-[#efeeea] rounded-lg overflow-hidden relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtRzKGTRi12F_E3JIHIE2tcWqRCs0YhZRF_2vn-eN8qfMTa5jIhJrNn7A-7DRSb2NfEWcuB_wBFyA_TEMOY1uwmwoch2G2lmIB5BkIStUd2sGjvpZJZLsb_x4HKfjkGLr2SyNFsMZXfz3vKPGW3v-tagkkz13iErZygh6_PuR9BMGZFoUAZOjs0GV0kghJs2i9-Db9zuKcAYn1Wy0WHxNyimB3hymMqkQXETT4C2rVULdAW9OCzt7Il11n84Jc82MV894emWjgp6fU"
                  alt="Digital artwork stream"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => onNavigate('preview')} className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#af101a]">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>

              <div className="aspect-square bg-[#efeeea] rounded-lg overflow-hidden relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4VFk_uHA65uQv3ElOv307WOgdcPtTeCb4y5vE4w41SoL1AiOEULv_6Bicmakn11lT1IVKBwp343ArC1XYTstwRxeHgtuh_-I--wN9VwXgekcQFD5FCWCWbBQoprVwclomF1rL5TRXMWZy_ljfSFj6FLNrur4FQEsup8jpxZnqk4dKAUiJVBI67n_dOuvBt6y-II2fisO6iBUd0pRVrgg__C6FTpmupgktoEZk8d3vcaJkof23Q7QRrxGBL3HFiz-0KekYTzDuIysU"
                  alt="Circuit board"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => onNavigate('preview')} className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#af101a]">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Exported PDFs */}
          <div className="bg-white border border-[#E5E1DA] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a]">PDFs Exportados Recientemente</h3>
              <button
                onClick={() => onNavigate('export')}
                className="text-[#af101a] text-xs font-bold hover:underline"
              >
                Ir al Centro de Exportación
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-[#f5f3ef] rounded-lg hover:bg-[#eae8e4] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#ffdad6] rounded flex items-center justify-center text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1b1c1a]">2024_Q4_Inventory_Master.pdf</p>
                    <p className="text-[10px] text-[#5f5e5e]">Exportado Oct 23 • 12.4 MB • 428 Páginas</p>
                  </div>
                </div>
                <button title="Descargar" className="p-2 hover:bg-white rounded-lg text-[#5f5e5e] hover:text-[#af101a]">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#f5f3ef] rounded-lg hover:bg-[#eae8e4] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#ffdad6] rounded flex items-center justify-center text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1b1c1a]">Luxury_Collection_Print_Spec.pdf</p>
                    <p className="text-[10px] text-[#5f5e5e]">Exportado Oct 21 • 8.1 MB • 156 Páginas</p>
                  </div>
                </div>
                <button title="Descargar" className="p-2 hover:bg-white rounded-lg text-[#5f5e5e] hover:text-[#af101a]">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => onNavigate('projects')}
        title="Crear Nuevo Proyecto"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#af101a] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform duration-300">
          add
        </span>
        <span className="absolute right-16 bg-[#1b1c1a] text-[#fbf9f5] px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl">
          Nuevo Proyecto de Catálogo
        </span>
      </button>
    </div>
  );
};
