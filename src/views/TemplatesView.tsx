import React, { useState } from 'react';
import { TemplateVariable } from '../types';
import { autoMapFields } from '../services/geminiService';

interface TemplatesViewProps {
  variables: TemplateVariable[];
  onUpdateVariables: (updated: TemplateVariable[]) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  variables,
  onUpdateVariables,
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>('{{price}}');
  const [zoomLevel, setZoomLevel] = useState<number>(85);
  const [isMappingLoading, setIsMappingLoading] = useState<boolean>(false);
  const [showVersionHistory, setShowVersionHistory] = useState<boolean>(false);

  const handleAutoMap = async () => {
    setIsMappingLoading(true);
    const sourceFields = ['product_uid', 'display_name_en', 'base_price_usd', 'description_formatted'];
    const targetFields = ['master.catalog.identifier', 'master.products.title_en', 'master.products.price_net', 'master.products.description_formatted'];

    const result = await autoMapFields(sourceFields, targetFields);

    const updated = variables.map((v) => {
      if (v.tag === '{{sku}}') {
        return {
          ...v,
          sourceSystem: 'SAP_Retail_PIM_v2',
          fieldMapping: result['product_uid'] || 'master.catalog.identifier',
          status: 'Validated' as const,
        };
      }
      return v;
    });

    setTimeout(() => {
      onUpdateVariables(updated);
      setIsMappingLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-geist text-[28px] font-semibold text-[#1b1c1a]">
            Winter_Catalog_2024.indd
          </h2>
          <p className="text-xs text-[#5f5e5e]">
            Diseño Maestro InDesign • 12 Enlaces de Variables Activos • Último guardado hace 10m
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVersionHistory(!showVersionHistory)}
            className="px-4 py-2 border border-[#eae8e4] hover:bg-[#f5f3ef] rounded-lg text-xs font-bold text-[#1b1c1a] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
Historial de Versiones
          </button>
          <button className="px-4 py-2 bg-[#af101a] text-white rounded-lg text-xs font-bold hover:brightness-110 flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            Subir Nuevo INDD
          </button>
        </div>
      </div>

      {/* Main Studio Canvas Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive InDesign Page Canvas (Span 8) */}
        <div className="lg:col-span-8 bg-white border border-[#E5E1DA] rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[520px] relative">
          {/* Canvas Floating Bar */}
          <div className="bg-[#f5f3ef] border-b border-[#eae8e4] px-4 py-2.5 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-[#5f5e5e]">
              <span className="material-symbols-outlined text-[16px]">crop_original</span>
              <span className="font-bold text-[#1b1c1a]">Vista Previa Spread 01-02</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="p-1 hover:bg-[#eae8e4] rounded text-[#5f5e5e]"
                title="Alejar"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="font-mono text-[11px] font-bold text-[#1b1c1a]">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1 hover:bg-[#eae8e4] rounded text-[#5f5e5e]"
                title="Acercar"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
              <div className="h-4 w-[1px] bg-[#eae8e4] mx-1"></div>
              <button
                onClick={() => setZoomLevel(85)}
                className="p-1 hover:bg-[#eae8e4] rounded text-[#5f5e5e] text-[11px] font-bold"
              >
                Ajustar
              </button>
            </div>
          </div>

          {/* Canvas Area with Interactive Variables */}
          <div className="flex-1 bg-[#eae8e4] p-8 flex items-center justify-center overflow-auto preview-canvas min-h-[420px]">
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
              className="w-[520px] h-[360px] bg-white shadow-2xl rounded-sm p-6 relative border border-[#d2ceca] flex flex-col justify-between transition-transform duration-200"
            >
              {/* Top Layout Header */}
              <div className="flex justify-between items-start border-b border-[#1b1c1a] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#af101a]">
                    ZEITGEIST COLLECTION
                  </span>
                  <div
                    onClick={() => setSelectedTag('{{product_name}}')}
                    className={`mt-1 cursor-pointer transition-all ${
                      selectedTag === '{{product_name}}'
                        ? 'ring-2 ring-[#af101a] bg-[#ffdad6]/40 p-1 rounded'
                        : 'hover:bg-[#f5f3ef] p-1 rounded'
                    }`}
                  >
                    <h3 className="font-geist text-2xl font-bold text-[#1b1c1a]">
                      Vanguard Chrono Titanium
                    </h3>
                    <span className="text-[9px] font-mono text-[#af101a] block font-bold">
                      TAG: &#123;&#123;product_name&#125;&#125;
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedTag('{{price}}')}
                  className={`text-right cursor-pointer transition-all ${
                    selectedTag === '{{price}}'
                      ? 'ring-2 ring-[#af101a] bg-[#ffdad6]/40 p-1 rounded'
                      : 'hover:bg-[#f5f3ef] p-1 rounded'
                  }`}
                >
                  <p className="font-geist text-xl font-extrabold text-[#af101a]">$14,500.00</p>
                  <span className="text-[9px] font-mono text-[#af101a] block font-bold">
                    TAG: &#123;&#123;price&#125;&#125;
                  </span>
                </div>
              </div>

              {/* Body Layout Spread */}
              <div className="grid grid-cols-2 gap-6 my-4 items-center">
                <div className="aspect-square bg-[#f5f3ef] rounded border border-[#eae8e4] overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL9SIoI1ogg4AzLf_GEOYmeXDNLkgZi0_TZgkQSfvMnUXK0AeqRFX9dN8MGbxUvyeHsRde9VZiEydqQbb_2X3SOMk-fBrAn145hfU7y4reDRx6xsFCO7G6BiQdhEsk0gcxh8x6E5pQFFN-F8RRHbM0OW2xB48S1NbSJ9NnoY8BU0HzwNrabk65N_nmHdt4FVECwXESf3STzyvaKdrYceZJi0WFhDzbp4lhaMOPG5Y4YlJq5Gjtqn4YcIfIXdy-M_78IrOahOgTUCkw"
                    alt="Watch layout"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                    High-Res TIFF (300DPI)
                  </div>
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => setSelectedTag('{{sku}}')}
                    className={`cursor-pointer transition-all ${
                      selectedTag === '{{sku}}'
                        ? 'ring-2 ring-[#af101a] bg-[#ffdad6]/40 p-1 rounded'
                        : 'hover:bg-[#f5f3ef] p-1 rounded'
                    }`}
                  >
                    <span className="text-[10px] text-[#5f5e5e] font-mono block">SKU: WH-992-AX</span>
                    <span className="text-[9px] font-mono text-[#af101a] font-bold">
                      TAG: &#123;&#123;sku&#125;&#125;
                    </span>
                  </div>

                  <p className="text-xs text-[#5f5e5e] leading-relaxed">
                    Precision-engineered grade-5 titanium casing with double-domed sapphire crystal.
                  </p>
                </div>
              </div>

              {/* Bottom Page Footer */}
              <div className="border-t border-[#eae8e4] pt-2 flex justify-between text-[9px] text-[#5f5e5e] font-mono">
                <span>WINTER CATALOG 2024</span>
                <span>PAGE 01 / 12</span>
              </div>
            </div>
          </div>

          {/* Drag & Drop INDD Overlay Notice */}
          <div className="p-3 bg-[#f5f3ef] border-t border-[#eae8e4] text-center text-xs text-[#5f5e5e] flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#af101a]">upload_file</span>
            <span>Arrastra y suelta archivos <strong>.INDD</strong> o <strong>.IDML</strong> actualizados aquí para resincronizar la geometría</span>
          </div>
        </div>

        {/* Layout Analysis & Swatch Sidebar (Span 4) */}
        <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-xl p-6 space-y-6 shadow-sm">
          <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#af101a]">find_in_page</span>
            Análisis InDesign
          </h3>

          {/* Extracted Variables list */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
                Variables Extraídas (4)
              </span>
              <span className="text-[10px] bg-[#1a472a]/10 text-[#1a472a] px-2 py-0.5 rounded font-bold">
                Auto-Detectadas
              </span>
            </div>
            <div className="space-y-1.5">
              {variables.map((v) => (
                <div
                  key={v.tag}
                  onClick={() => setSelectedTag(v.tag)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex justify-between items-center transition-all ${
                    selectedTag === v.tag
                      ? 'bg-[#ffdad6]/40 border-[#af101a] font-bold'
                      : 'bg-[#fbf9f5] border-[#eae8e4] hover:bg-[#f5f3ef]'
                  }`}
                >
                  <div>
                    <p className="font-mono text-[#1b1c1a]">{v.tag}</p>
                    <p className="text-[10px] text-[#5f5e5e] truncate">{v.fieldMapping}</p>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                      v.status === 'Validated'
                        ? 'bg-[#1a472a] text-white'
                        : 'bg-amber-500 text-white animate-pulse'
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Swatches */}
          <div>
            <span className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider block mb-2">
              Muestras Detectadas
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#f5f3ef] px-2.5 py-1.5 rounded border border-[#eae8e4]">
                <div className="w-4 h-4 rounded-full bg-[#af101a] border border-black/10"></div>
                <span className="text-[10px] font-mono text-[#1b1c1a] font-bold">#AF101A</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f5f3ef] px-2.5 py-1.5 rounded border border-[#eae8e4]">
                <div className="w-4 h-4 rounded-full bg-[#1b1c1a] border border-black/10"></div>
                <span className="text-[10px] font-mono text-[#1b1c1a] font-bold">#1B1C1A</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f5f3ef] px-2.5 py-1.5 rounded border border-[#eae8e4]">
                <div className="w-4 h-4 rounded-full bg-[#e5e1da] border border-black/10"></div>
                <span className="text-[10px] font-mono text-[#1b1c1a] font-bold">#E5E1DA</span>
              </div>
            </div>
          </div>

          {/* Layout Dimensions Specs */}
          <div className="p-3 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] space-y-2 text-xs">
            <div className="flex justify-between text-[#5f5e5e]">
              <span>Dimensiones:</span>
              <span className="font-mono font-bold text-[#1b1c1a]">210 x 297 mm (A4)</span>
            </div>
            <div className="flex justify-between text-[#5f5e5e]">
              <span>Sangrado:</span>
              <span className="font-mono font-bold text-[#1b1c1a]">3 mm All Sides</span>
            </div>
            <div className="flex justify-between text-[#5f5e5e]">
              <span>Fuentes Incrustadas:</span>
              <span className="font-mono font-bold text-[#1b1c1a]">Inter, Geist Display</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Field Mapping Table */}
      <div className="bg-white border border-[#E5E1DA] rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-[#eae8e4] pb-3">
          <div>
            <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a]">Matriz de Mapeo de Datos</h3>
            <p className="text-xs text-[#5f5e5e]">
              Vincula etiquetas InDesign directamente a campos de base de datos empresariales o atributos PIM.
            </p>
          </div>

          <button
            onClick={handleAutoMap}
            disabled={isMappingLoading}
            className="px-4 py-2 bg-[#1b1c1a] text-white rounded-lg text-xs font-bold hover:bg-black flex items-center gap-2 shadow-sm transition-all"
          >
            <span className={`material-symbols-outlined text-[16px] ${isMappingLoading ? 'animate-spin' : ''}`}>
              auto_awesome
            </span>
            <span>{isMappingLoading ? 'Analizando Esquema...' : 'Auto-Mapeo IA'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1b1c1a]">
            <thead className="bg-[#f5f3ef] font-geist text-[#5f5e5e] uppercase text-[10px] tracking-wider border-b border-[#eae8e4]">
              <tr>
                <th className="p-3">Etiqueta de Plantilla</th>
                <th className="p-3">Sistema de Origen</th>
                <th className="p-3">Mapeo de Campo</th>
                <th className="p-3">Valor de Respaldo</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eae8e4]">
              {variables.map((v) => (
                <tr key={v.tag} className="hover:bg-[#f5f3ef]/50">
                  <td className="p-3 font-mono font-bold text-[#af101a]">{v.tag}</td>
                  <td className="p-3 text-[#5f5e5e]">{v.sourceSystem}</td>
                  <td className="p-3 font-mono text-[#1b1c1a]">{v.fieldMapping}</td>
                  <td className="p-3 text-[#5f5e5e] italic">{v.fallbackValue}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.status === 'Validated'
                          ? 'bg-[#1a472a]/10 text-[#1a472a]'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
{
                    v.status === 'Validated' ? 'Validado' :
                    v.status === 'Analyzing' ? 'Analizando' :
                    v.status === 'Pending' ? 'Pendiente' : v.status
                  }
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-[#af101a] hover:underline font-bold text-[11px]">
                      Editar Enlace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Version History Drawer / Block */}
      {showVersionHistory && (
        <div className="bg-white border border-[#E5E1DA] rounded-xl p-6 shadow-sm space-y-4 animate-fade-in">
          <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-2">
            Revisiones de Diseño InDesign
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#f5f3ef] rounded-lg border border-[#af101a]/30 flex justify-between items-center">
              <div>
                <p className="font-bold text-[#1b1c1a] flex items-center gap-2">
                  Versión 4 (Actual)
                  <span className="px-2 py-0.5 bg-[#af101a] text-white rounded text-[9px]">EN VIVO</span>
                </p>
                <p className="text-[10px] text-[#5f5e5e]">Oct 24, 2026 • Por Alex Rivera • "Alineación de cuadrícula actualizada para productos de lujo"</p>
              </div>
              <button className="text-[#5f5e5e] text-xs font-bold" disabled>Actual</button>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#eae8e4] flex justify-between items-center hover:bg-[#fbf9f5]">
              <div>
                <p className="font-bold text-[#1b1c1a]">Versión 3 (Archivo)</p>
                <p className="text-[10px] text-[#5f5e5e]">Oct 10, 2026 • Por Design Ops • "Versión inicial del diseño"</p>
              </div>
              <button className="text-[#af101a] hover:underline font-bold text-xs">
                Restaurar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
