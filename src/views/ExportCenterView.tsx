import React, { useState } from 'react';
import { ExportHistoryItem } from '../types';

interface ExportCenterViewProps {
  exportHistory: ExportHistoryItem[];
  onAddExport: (item: ExportHistoryItem) => void;
}

export const ExportCenterView: React.FC<ExportCenterViewProps> = ({
  exportHistory,
  onAddExport,
}) => {
  const [format, setFormat] = useState<'pdf' | 'png' | 'zip'>('pdf');
  const [onlyModified, setOnlyModified] = useState<boolean>(true);
  const [includeMetadata, setIncludeMetadata] = useState<boolean>(true);
  const [versionLabel, setVersionLabel] = useState<string>('v2.5.0-Release');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleStartExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const created: ExportHistoryItem = {
        id: `exp-${Date.now()}`,
        filename: `${versionLabel}_${format.toUpperCase()}_Export`,
        date: 'Just now',
        size: '142.8 MB',
        status: 'Success',
        type: format,
      };
      onAddExport(created);
      setIsExporting(false);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-geist text-[28px] font-semibold text-[#1b1c1a]">
            Centro de Exportación y Comparación de Versiones
          </h2>
          <p className="text-xs text-[#5f5e5e]">
            Exporta catálogos como PDFs listos para impresión, paquetes de activos y datos sincronizados desde BDD/Excel/API.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Configure New Export Panel (Span 7) */}
        <div className="lg:col-span-7 bg-white border border-[#E5E1DA] rounded-xl p-6 space-y-6 shadow-sm">
          <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#af101a]">ios_share</span>
            Configurar Exportación
          </h3>

          {/* Format Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
              Formato de Salida
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  format === 'pdf' ? 'bg-[#af101a] text-white border-[#af101a] shadow' : 'bg-[#f5f3ef] border-[#eae8e4] text-[#1b1c1a]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                <span>Documento PDF</span>
              </button>

              <button
                onClick={() => setFormat('png')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  format === 'png' ? 'bg-[#af101a] text-white border-[#af101a] shadow' : 'bg-[#f5f3ef] border-[#eae8e4] text-[#1b1c1a]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">image</span>
                <span>Paquete PNG</span>
              </button>

              <button
                onClick={() => setFormat('zip')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                  format === 'zip' ? 'bg-[#af101a] text-white border-[#af101a] shadow' : 'bg-[#f5f3ef] border-[#eae8e4] text-[#1b1c1a]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">folder_zip</span>
                <span>Paquete ZIP</span>
              </button>
            </div>
          </div>

          {/* Export Toggles & Inputs */}
          <div className="space-y-3 pt-2 border-t border-[#eae8e4]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#1b1c1a]">Exportar Solo Páginas Modificadas</span>
              <input
                type="checkbox"
                checked={onlyModified}
                onChange={(e) => setOnlyModified(e.target.checked)}
                className="w-4 h-4 accent-[#af101a] rounded"
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#1b1c1a]">Incluir Etiquetas de Metadatos y Códigos QR</span>
              <input
                type="checkbox"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="w-4 h-4 accent-[#af101a] rounded"
              />
            </div>

            <div className="space-y-1 pt-2">
              <label className="block text-[11px] font-bold text-[#5f5e5e]">Etiqueta de Versión</label>
              <input
                type="text"
                value={versionLabel}
                onChange={(e) => setVersionLabel(e.target.value)}
                className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2 text-xs font-mono text-[#1b1c1a]"
              />
            </div>
          </div>

          <button
            onClick={handleStartExport}
            disabled={isExporting}
            className="w-full py-3.5 bg-[#af101a] text-white font-geist font-bold text-sm rounded-xl hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#af101a]/20 transition-all"
          >
            <span className={`material-symbols-outlined text-[20px] ${isExporting ? 'animate-spin' : ''}`}>
              download
            </span>
            <span>{isExporting ? 'Compilando Paquete...' : 'Iniciar Exportación Global'}</span>
          </button>
        </div>

        {/* Export History Sidebar (Span 5) */}
        <div className="lg:col-span-5 bg-white border border-[#E5E1DA] rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3">
            Historial de Exportación y Registros
          </h3>

          <div className="space-y-3">
            {exportHistory.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xs text-[#1b1c1a] truncate">{item.filename}</p>
                    <p className="text-[10px] text-[#5f5e5e]">{item.date} • {item.size}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      item.status === 'Success'
                        ? 'bg-[#1a472a]/10 text-[#1a472a]'
                        : item.status === 'Processing'
                        ? 'bg-[#d3e4fe] text-[#0b1c30] animate-pulse'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}
                  >
                    {
                      item.status === 'Success' ? 'Éxito' :
                      item.status === 'Processing' ? 'Procesando' :
                      item.status === 'Failed' ? 'Fallido' : item.status
                    }
                  </span>
                </div>

                {item.progress && (
                  <div className="w-full bg-[#eae8e4] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#af101a] h-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                )}

                {item.error && (
                  <p className="text-[10px] text-[#ba1a1a] font-mono">{item.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
