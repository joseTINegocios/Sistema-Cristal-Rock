import React, { useState } from 'react';
import { initialProjects, initialVariables, initialProducts } from '../data/mockData';

const STEPS = [
  { num: 1, label: 'Subir Catálogo' },
  { num: 2, label: 'Vincular Datos' },
  { num: 3, label: 'Vista Previa' },
  { num: 4, label: 'Exportar' },
];

export const WizardView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState<typeof initialProjects[0] | null>(null);
  const [confirmedMapping, setConfirmedMapping] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>('{{price}}');

  const projects = initialProjects;
  const variables = initialVariables;
  const products = initialProducts;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSelectProject = (proj: typeof initialProjects[0]) => {
    setSelectedProject(proj);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedProject(null);
    setConfirmedMapping(false);
    setExported(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-geist transition-all ${
                  step === s.num
                    ? 'bg-[#af101a] text-white shadow-md scale-110'
                    : step > s.num
                    ? 'bg-[#1a472a] text-white'
                    : 'bg-[#f5f3ef] text-[#5f5e5e] border border-[#e5e1da]'
                }`}
              >
                {step > s.num ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  s.num
                )}
              </div>
              <span
                className={`font-geist text-xs font-bold hidden sm:inline ${
                  step === s.num ? 'text-[#1b1c1a]' : 'text-[#5f5e5e]'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step > s.num ? 'bg-[#1a472a]' : 'bg-[#e5e1da]'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Upload Catalog */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-geist text-2xl font-bold text-[#1b1c1a] mb-1">
              Sube tu catálogo
            </h2>
            <p className="text-[#5f5e5e] text-sm">
              Selecciona un archivo IDML o INDD de InDesign para empezar
            </p>
          </div>

          <div className="border-2 border-dashed border-[#e5e1da] rounded-2xl p-8 text-center bg-white hover:border-[#af101a] transition-colors cursor-pointer group">
            <div className="w-14 h-14 bg-[#f5f3ef] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#ffdad6] transition-colors">
              <span className="material-symbols-outlined text-2xl text-[#af101a]">upload_file</span>
            </div>
            <p className="font-geist font-bold text-base text-[#1b1c1a] mb-1">
              Haz clic para buscar archivos
            </p>
            <p className="text-sm text-[#5f5e5e]">
              o arrastra y suelta tu archivo IDML / INDD aquí
            </p>
            <p className="text-xs text-[#5f5e5e] mt-3 bg-[#f5f3ef] inline-block px-4 py-1.5 rounded-full">
              Formatos soportados: .idml, .indd
            </p>
          </div>

          {!selectedProject && (
            <>
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-[#e5e1da]" />
                <span className="text-sm text-[#5f5e5e] font-bold">o elige uno reciente</span>
                <div className="flex-1 h-px bg-[#e5e1da]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(proj)}
                    className={`bg-white border rounded-xl p-4 text-left hover:shadow-lg transition-all ${
                      selectedProject?.id === proj.id
                        ? 'border-[#af101a] ring-2 ring-[#af101a]/20'
                        : 'border-[#e5e1da]'
                    }`}
                  >
                    <div className="w-full h-20 bg-[#f5f3ef] rounded-lg overflow-hidden mb-3">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-geist font-bold text-sm text-[#1b1c1a] truncate">{proj.name}</p>
                    <p className="text-xs text-[#5f5e5e]">{proj.productsCount} productos</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedProject && (
            <div className="bg-white border border-[#1a472a]/30 rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-[#1a472a]/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1a472a]">check_circle</span>
              </div>
              <div className="flex-1">
                <p className="font-geist font-bold text-[#1b1c1a]">{selectedProject.name}</p>
                <p className="text-sm text-[#5f5e5e]">IDML procesado correctamente</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-sm text-[#af101a] font-bold hover:underline"
              >
                Cambiar
              </button>
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={!selectedProject}
            className="w-full py-3 bg-[#af101a] text-white font-geist font-bold rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#af101a]/20 active:scale-[0.99]"
          >
            Continuar
          </button>
        </div>
      )}

      {/* Step 2: Link Data — Visual Template Style */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-geist text-2xl font-bold text-[#1b1c1a] mb-1">
              Vinculación de datos
            </h2>
            <p className="text-[#5f5e5e] text-sm">
              Haz clic sobre cualquier variable en el catálogo para ver su origen de datos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Catalog Preview Canvas */}
            <div className="lg:col-span-8 bg-white border border-[#e5e1da] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#f5f3ef] border-b border-[#eae8e4] px-4 py-2.5 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-[#5f5e5e]">
                  <span className="material-symbols-outlined text-[16px]">crop_original</span>
                  <span className="font-bold text-[#1b1c1a]">Vista Previa Spread 01-02</span>
                </div>
                <span className="text-[10px] bg-[#1a472a]/10 text-[#1a472a] px-2 py-0.5 rounded font-bold">
                  {variables.filter(v => v.status === 'Validated').length}/{variables.length} vinculadas
                </span>
              </div>

              <div className="bg-[#eae8e4] p-6 flex items-center justify-center min-h-[400px] preview-canvas">
                <div className="w-full max-w-[520px] bg-white shadow-2xl rounded-sm p-6 border border-[#d2ceca] flex flex-col justify-between transition-transform duration-200">
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
                        <h3 className="font-geist text-xl font-bold text-[#1b1c1a]">
                          Vanguard Chrono Titanium
                        </h3>
                        <span className="text-[8px] font-mono text-[#af101a] block font-bold">
                          TAG: {'{{product_name}}'}
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
                      <p className="font-geist text-lg font-extrabold text-[#af101a]">$14,500.00</p>
                      <span className="text-[8px] font-mono text-[#af101a] block font-bold">
                        TAG: {'{{price}}'}
                      </span>
                    </div>
                  </div>

                  {/* Body Layout */}
                  <div className="grid grid-cols-2 gap-4 my-4 items-center">
                    <div className="aspect-square bg-[#f5f3ef] rounded border border-[#eae8e4] overflow-hidden">
                      <img
                        src={products[0].image}
                        alt="Watch"
                        className="w-full h-full object-cover"
                      />
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
                        <span className="text-[8px] font-mono text-[#af101a] font-bold">
                          TAG: {'{{sku}}'}
                        </span>
                      </div>

                      <div
                        onClick={() => setSelectedTag('{{description}}')}
                        className={`cursor-pointer transition-all ${
                          selectedTag === '{{description}}'
                            ? 'ring-2 ring-[#af101a] bg-[#ffdad6]/40 p-1 rounded'
                            : 'hover:bg-[#f5f3ef] p-1 rounded'
                        }`}
                      >
                        <p className="text-xs text-[#5f5e5e] leading-relaxed">
                          Precision-engineered grade-5 titanium casing with double-domed sapphire crystal.
                        </p>
                        <span className="text-[8px] font-mono text-[#af101a] font-bold">
                          TAG: {'{{description}}'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-[#eae8e4] pt-2 flex justify-between text-[8px] text-[#5f5e5e] font-mono">
                    <span>WINTER CATALOG 2024</span>
                    <span>PAGE 01 / 12</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Variables Sidebar */}
            <div className="lg:col-span-4 bg-white border border-[#e5e1da] rounded-xl p-5 space-y-4 shadow-sm">
              <h3 className="font-geist text-base font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#af101a]">find_in_page</span>
                Variables Extraídas
              </h3>

              <div className="space-y-2">
                {variables.map((v) => (
                  <div
                    key={v.tag}
                    onClick={() => setSelectedTag(v.tag)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      selectedTag === v.tag
                        ? 'bg-[#ffdad6]/40 border-[#af101a] ring-1 ring-[#af101a]/30'
                        : 'bg-[#fbf9f5] border-[#eae8e4] hover:bg-[#f5f3ef]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <code className="font-mono font-bold text-[#1b1c1a] text-xs">{v.tag}</code>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                          v.status === 'Validated'
                            ? 'bg-[#1a472a]/10 text-[#1a472a]'
                            : 'bg-amber-100 text-amber-800 animate-pulse'
                        }`}
                      >
                        {v.status === 'Validated' ? 'Vinculado' : v.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#5f5e5e] font-mono truncate">{v.fieldMapping}</p>
                    <p className="text-[9px] text-[#5f5e5e] mt-0.5 truncate">← {v.sourceSystem}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] text-xs space-y-1.5">
                <div className="flex justify-between text-[#5f5e5e]">
                  <span>Dimensiones:</span>
                  <span className="font-mono font-bold text-[#1b1c1a]">210 x 297 mm (A4)</span>
                </div>
                <div className="flex justify-between text-[#5f5e5e]">
                  <span>Fuentes:</span>
                  <span className="font-mono font-bold text-[#1b1c1a]">Inter, Geist</span>
                </div>
              </div>
            </div>
          </div>

          {!confirmedMapping ? (
            <button
              onClick={() => { setConfirmedMapping(true); }}
              className="w-full py-3 bg-[#1a472a] text-white font-geist font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[#1a472a]/20 active:scale-[0.99]"
            >
              Confirmar vinculación
            </button>
          ) : (
            <div className="bg-[#1a472a]/10 border border-[#1a472a]/30 rounded-xl p-5 flex items-center gap-4">
              <span className="material-symbols-outlined text-[#1a472a] text-2xl">check_circle</span>
              <div className="flex-1">
                <p className="font-geist font-bold text-[#1b1c1a]">Datos vinculados correctamente</p>
                <p className="text-sm text-[#5f5e5e]">4 variables mapeadas a sus fuentes</p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 border border-[#e5e1da] text-[#1b1c1a] font-bold rounded-xl hover:bg-[#f5f3ef] transition-all"
            >
              Atrás
            </button>
            <button
              onClick={handleNext}
              disabled={!confirmedMapping}
              className="flex-1 py-3 bg-[#af101a] text-white font-geist font-bold rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#af101a]/20 active:scale-[0.99]"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-geist text-2xl font-bold text-[#1b1c1a] mb-1">
              Vista previa
            </h2>
            <p className="text-[#5f5e5e] text-sm">
              Así se verá tu catálogo con los datos vinculados
            </p>
          </div>

          <div className="bg-white border border-[#e5e1da] rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-[#1b1c1a] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {selectedProject?.templates.name || 'Catálogo'}
                </p>
                <p className="font-geist text-lg font-bold">
                  {selectedProject?.name || 'Vista previa'}
                </p>
              </div>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                {variables.length} variables sincronizadas
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-video bg-[#f5f3ef] rounded-xl overflow-hidden border border-[#e5e1da]">
                <img
                  src={products[0].image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 2).map((p) => (
                  <div key={p.id} className="bg-[#fbf9f5] border border-[#e5e1da] rounded-xl p-4">
                    <div className="w-full h-24 bg-[#f5f3ef] rounded-lg overflow-hidden mb-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-geist font-bold text-sm text-[#1b1c1a]">{p.name}</p>
                    <p className="text-lg font-geist font-bold text-[#af101a]">${p.price.toFixed(2)}</p>
                    <p className="text-xs text-[#5f5e5e]">{p.sku}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 py-3 border border-[#e5e1da] text-[#1b1c1a] font-bold rounded-xl hover:bg-[#f5f3ef] transition-all"
            >
              Atrás
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-[#af101a] text-white font-geist font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[#af101a]/20 active:scale-[0.99]"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Export */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-geist text-2xl font-bold text-[#1b1c1a] mb-1">
              Listo para exportar
            </h2>
            <p className="text-[#5f5e5e] text-sm">
              Tu catálogo está completo y sincronizado
            </p>
          </div>

          <div className="bg-white border border-[#e5e1da] rounded-xl p-6 space-y-3 shadow-sm">
            <div className="flex justify-between text-sm">
              <span className="text-[#5f5e5e]">Catálogo</span>
              <span className="font-bold text-[#1b1c1a]">{selectedProject?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#5f5e5e]">Productos</span>
              <span className="font-bold text-[#1b1c1a]">{products.length} en vista previa</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#5f5e5e]">Variables</span>
              <span className="font-bold text-[#1b1c1a]">{variables.length} vinculadas</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#5f5e5e]">Formato</span>
              <span className="font-bold text-[#1b1c1a]">PDF</span>
            </div>
          </div>

          {!exported ? (
            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full py-4 bg-[#af101a] text-white font-geist font-bold text-lg rounded-xl hover:brightness-110 disabled:opacity-60 transition-all shadow-lg shadow-[#af101a]/30 active:scale-[0.99] flex items-center justify-center gap-3"
            >
              <span className={`material-symbols-outlined text-2xl ${exporting ? 'animate-spin' : ''}`}>
                {exporting ? 'sync' : 'download'}
              </span>
              <span>{exporting ? 'Exportando...' : 'Descargar catálogo PDF'}</span>
            </button>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#1a472a]/10 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-5xl text-[#1a472a]">check_circle</span>
              </div>
              <div>
                <p className="font-geist text-2xl font-bold text-[#1b1c1a]">¡Exportado con éxito!</p>
                <p className="text-[#5f5e5e]">Tu catálogo se ha generado correctamente</p>
              </div>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#1b1c1a] text-white font-geist font-bold rounded-xl hover:bg-[#333] transition-all"
              >
                Crear otro catálogo
              </button>
            </div>
          )}

          {!exported && (
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-3 border border-[#e5e1da] text-[#1b1c1a] font-bold rounded-xl hover:bg-[#f5f3ef] transition-all"
              >
                Atrás
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
