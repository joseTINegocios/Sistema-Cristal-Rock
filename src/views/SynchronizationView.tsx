import React, { useState } from 'react';
import { SyncConnection } from '../types';

interface SynchronizationViewProps {
  connections: SyncConnection[];
}

export const SynchronizationView: React.FC<SynchronizationViewProps> = ({ connections }) => {
  const [isSyncingAll, setIsSyncingAll] = useState<boolean>(false);
  const [dataViewMode, setDataViewMode] = useState<'json' | 'table'>('json');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setToastMessage('Pipeline de Sincronización Global Iniciado...');
    setTimeout(() => {
      setIsSyncingAll(false);
      setToastMessage('Sincronización Global Finalizada Exitosamente (142 nodos actualizados).');
      setTimeout(() => setToastMessage(null), 4000);
    }, 2000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#1b1c1a] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#af101a]">sync</span>
          <p className="text-xs font-bold">{toastMessage}</p>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-geist text-[28px] font-semibold text-[#1b1c1a]">
            Motor de Sincronización
          </h2>
          <p className="text-xs text-[#5f5e5e]">
            Sincroniza catálogos desde bases de datos, archivos Excel y APIs externas. Mantén actualizados precios, inventario y metadatos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-[#eae8e4] hover:bg-[#f5f3ef] rounded-lg text-xs font-bold text-[#1b1c1a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            Subir Excel
          </button>
          <button className="px-4 py-2 border border-[#eae8e4] hover:bg-[#f5f3ef] rounded-lg text-xs font-bold text-[#1b1c1a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">event</span>
            Programar Trabajos
          </button>
          <button
            onClick={handleSyncAll}
            disabled={isSyncingAll}
            className="px-5 py-2 bg-[#af101a] text-white rounded-lg text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-sm"
          >
            <span className={`material-symbols-outlined text-[18px] ${isSyncingAll ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncingAll ? 'Sincronizando...' : 'Sincronizar Todo Ahora'}</span>
          </button>
        </div>
      </div>

      {/* Active Connections List (Span 4) & Field Mapper (Span 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Active Connections Panel */}
        <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3 flex items-center justify-between">
            <span>Conexiones de Datos</span>
            <span className="text-xs font-mono text-[#af101a]">4 Configuradas</span>
          </h3>

          <div className="space-y-3">
            {connections.map((conn) => (
              <div
                key={conn.id}
                className="p-3 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] space-y-2 hover:border-[#e4beba] transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xs text-[#1b1c1a]">{conn.name}</p>
                    <p className="text-[10px] text-[#5f5e5e]">{conn.subtitle}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      conn.status === 'Active'
                        ? 'bg-[#1a472a]/10 text-[#1a472a]'
                        : conn.status === 'Error'
                        ? 'bg-[#ffdad6] text-[#ba1a1a] animate-pulse'
                        : 'bg-[#eae8e4] text-[#5f5e5e]'
                    }`}
                  >
                    {
                      conn.status === 'Active' ? 'Activo' :
                      conn.status === 'Error' ? 'Error' :
                      conn.status === 'Idle' ? 'Inactivo' : conn.status
                    }
                  </span>
                </div>

                {conn.errorMessage ? (
                  <p className="text-[10px] text-[#ba1a1a] font-bold">{conn.errorMessage}</p>
                ) : (
                  <p className="text-[10px] text-[#5f5e5e]">Última sinc.: {conn.lastSync}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visual Field Mapping Tool */}
        <div className="lg:col-span-8 bg-white border border-[#E5E1DA] rounded-xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#eae8e4] pb-3">
            <div>
              <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a]">Mapeador Visual de Campos</h3>
              <p className="text-xs text-[#5f5e5e]">Vincula campos de BDD, Excel o APIs externas a las variables extraídas de tus archivos InDesign.</p>
            </div>
          </div>

          {/* Mapper Diagram */}
          <div className="grid grid-cols-3 gap-4 items-center bg-[#fbf9f5] p-6 rounded-xl border border-[#eae8e4] relative min-h-[220px]">
            {/* Left Source Fields */}
            <div className="space-y-3 z-10">
              <span className="text-[10px] font-bold text-[#5f5e5e] uppercase tracking-wider block">API de Origen</span>
              <div className="p-2 bg-white rounded border border-[#e4beba] text-xs font-mono text-[#1b1c1a]">product_uid</div>
              <div className="p-2 bg-white rounded border border-[#e4beba] text-xs font-mono text-[#1b1c1a]">display_name_en</div>
              <div className="p-2 bg-white rounded border border-[#e4beba] text-xs font-mono text-[#1b1c1a]">base_price_usd</div>
            </div>

            {/* Center Animated Connecting Lines */}
            <div className="flex flex-col items-center justify-center text-center text-xs text-[#af101a] font-bold gap-2">
              <span className="material-symbols-outlined text-3xl animate-pulse">sync_alt</span>
              <span className="text-[10px] font-mono">Sincronización Automática Activa</span>
            </div>

            {/* Right Enterprise Schema Fields */}
            <div className="space-y-3 z-10">
              <span className="text-[10px] font-bold text-[#5f5e5e] uppercase tracking-wider block">Catálogo Empresarial</span>
              <div className="p-2 bg-white rounded border border-[#e4beba] text-xs font-mono text-[#1b1c1a]">id_hash</div>
              <div className="p-2 bg-white rounded border border-[#e4beba] text-xs font-mono text-[#1b1c1a]">product_title</div>
              <div className="p-2 bg-white rounded border border-[#e4beba] text-xs font-mono text-[#1b1c1a]">unit_cost</div>
            </div>
          </div>

          {/* Data Preview Box */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#5f5e5e]">Muestra de Payload en Vivo</span>
              <div className="flex gap-2 font-mono text-[10px]">
                <button
                  onClick={() => setDataViewMode('json')}
                  className={`px-2 py-0.5 rounded ${dataViewMode === 'json' ? 'bg-[#af101a] text-white' : 'bg-[#eae8e4]'}`}
                >
                  JSON
                </button>
                <button
                  onClick={() => setDataViewMode('table')}
                  className={`px-2 py-0.5 rounded ${dataViewMode === 'table' ? 'bg-[#af101a] text-white' : 'bg-[#eae8e4]'}`}
                >
                  Table
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#1b1c1a] text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
              {dataViewMode === 'json' ? (
                <pre>{`{
  "product_uid": "SW-001-TI",
  "display_name_en": "Vanguard Series 5",
  "base_price_usd": 499.00,
  "stock_level": 142
}`}</pre>
              ) : (
                <p>Showing 1 row • SW-001-TI • Vanguard Series 5 • $499.00</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
