import React, { useState } from 'react';
import { AIAssetItem, AIAssetsSubView } from '../types';
import { generateCoverIdea } from '../services/geminiService';

interface AIAssetsViewProps {
  assets: AIAssetItem[];
  subView: AIAssetsSubView;
  onSubViewChange: (sub: AIAssetsSubView) => void;
  onAddAsset: (asset: AIAssetItem) => void;
}

export const AIAssetsView: React.FC<AIAssetsViewProps> = ({
  assets,
  subView,
  onSubViewChange,
  onAddAsset,
}) => {
  // Library State
  const [activeTab, setActiveTab] = useState<'All' | 'Verified' | 'In Draft'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Cover Generator State
  const [coverPrompt, setCoverPrompt] = useState<string>(
    'A sleek, dark minimalist watch face resting on volcanic basalt with soft red ambient light'
  );
  const [coverStyle, setCoverStyle] = useState<string>('Cinematic');
  const [coverTitle, setCoverTitle] = useState<string>('WINTER TIMELESS');
  const [coverSubtitle, setCoverSubtitle] = useState<string>('COLLECTION 2026');
  const [isGeneratingCover, setIsGeneratingCover] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<string>(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAf2FRgjg_dW_i5UShJm0n_33ZJhSD1jOxg9Nu66UJBTgHWUaMwuCIVXvumGeSnfbB47TKIYgylW2ShIWRRl-Lkhv4TTjIjktgkUMYRTRrboIBPqG86ZQKLXsKOzP94u5QmVgk_ZuD0EqorOVbBNUFuGyr-bDIPMTGbtqkRJUd7CoOLkpCIiCcAtE8ThegF2ROVORhdAtyMTOWQbhk1mDsYiEQv_OcxDvQw8wmNqpbCEmFncXvOrS674Qhbn_A9ngw5W9g4_CoXPsSf'
  );

  // Icon Designer State
  const [iconPrompt, setIconPrompt] = useState<string>('Horological gear wheels, luxury watch hands, precision crown');
  const [iconStyle, setIconStyle] = useState<string>('Line Art');
  const [strokeWeight, setStrokeWeight] = useState<number>(2);
  const [cornerRoundness, setCornerRoundness] = useState<number>(4);
  const [isGeneratingIcons, setIsGeneratingIcons] = useState<boolean>(false);

  // Extractor State
  const [extractionProgress, setExtractionProgress] = useState<number>(85);
  const [selectedComponents, setSelectedComponents] = useState<string[]>(['Pricing Table', 'Technical Spec Icons', 'Product Hero Card']);

  const filteredAssets = assets.filter((a) => {
    const matchesTab = activeTab === 'All' || a.status === activeTab;
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    return matchesTab && matchesCat;
  });

  const handleGenerateCover = async () => {
    setIsGeneratingCover(true);
    const result = await generateCoverIdea(coverPrompt, coverStyle);
    setCoverTitle(result.title);
    setCoverSubtitle(result.subtitle);

    // Dynamic cover image swap simulation
    const options = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAf2FRgjg_dW_i5UShJm0n_33ZJhSD1jOxg9Nu66UJBTgHWUaMwuCIVXvumGeSnfbB47TKIYgylW2ShIWRRl-Lkhv4TTjIjktgkUMYRTRrboIBPqG86ZQKLXsKOzP94u5QmVgk_ZuD0EqorOVbBNUFuGyr-bDIPMTGbtqkRJUd7CoOLkpCIiCcAtE8ThegF2ROVORhdAtyMTOWQbhk1mDsYiEQv_OcxDvQw8wmNqpbCEmFncXvOrS674Qhbn_A9ngw5W9g4_CoXPsSf',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCE9nCeIhSfpdrh1x1wSMzMfBEQY_pvk711ZAxKasGxwPI0iC-7ziaHwsTIhCvYi4lkSw6OZjf1BSoUAsOfCZHU_tX7QzaUlIuTYrrGuJdUYqY37nb9pxjvcIWkvoEzuxjMhFo2ybYIImTD1DGQNl4PQUWDEjKGLaJjGbsJofr4ETbGWfMHYwAUdeNJHMYVQkdxQALBLr7yndAUGyCf6emdP6LkmIQi2ROHeT_hWbjNZsDz_lq7i0R6ZbzVz_dr_ZNYW33Uxgc6MS2S'
    ];
    setCoverImage(options[Math.floor(Math.random() * options.length)]);

    setTimeout(() => {
      setIsGeneratingCover(false);
    }, 1200);
  };

  const handleGenerateIcons = () => {
    setIsGeneratingIcons(true);
    setTimeout(() => {
      setIsGeneratingIcons(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Sub-view Navigation Switcher */}
      <div className="bg-white border border-[#E5E1DA] rounded-xl p-2 flex items-center gap-2 shadow-sm max-w-2xl">
        <button
          onClick={() => onSubViewChange('library')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            subView === 'library'
              ? 'bg-[#af101a] text-white shadow'
              : 'text-[#5f5e5e] hover:bg-[#f5f3ef]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">grid_view</span>
          Biblioteca de Activos
        </button>

        <button
          onClick={() => onSubViewChange('cover-generator')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            subView === 'cover-generator'
              ? 'bg-[#af101a] text-white shadow'
              : 'text-[#5f5e5e] hover:bg-[#f5f3ef]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">auto_stories</span>
Generador de Portadas
        </button>

        <button
          onClick={() => onSubViewChange('icon-designer')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            subView === 'icon-designer'
              ? 'bg-[#af101a] text-white shadow'
              : 'text-[#5f5e5e] hover:bg-[#f5f3ef]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">draw</span>
Diseñador de Iconos
          </button>

          <button
            onClick={() => onSubViewChange('extractor')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              subView === 'extractor'
                ? 'bg-[#af101a] text-white shadow'
                : 'text-[#5f5e5e] hover:bg-[#f5f3ef]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">crop_free</span>
            Extractor de Componentes
        </button>
      </div>

      {/* SUB-VIEW 1: ASSETS LIBRARY */}
      {subView === 'library' && (
        <div className="space-y-6">
          {/* Category Cards Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() => setSelectedCategory('Backgrounds')}
              className={`p-4 bg-white border rounded-xl shadow-sm cursor-pointer hover:border-[#af101a] transition-all ${
                selectedCategory === 'Backgrounds' ? 'border-[#af101a] ring-2 ring-[#af101a]/20' : 'border-[#E5E1DA]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#af101a] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">landscape</span>
              </div>
              <p className="font-geist font-bold text-sm text-[#1b1c1a]">Fondos</p>
              <p className="text-xs text-[#5f5e5e]">124 Activos</p>
            </div>

            <div
              onClick={() => setSelectedCategory('Campaigns')}
              className={`p-4 bg-white border rounded-xl shadow-sm cursor-pointer hover:border-[#af101a] transition-all ${
                selectedCategory === 'Campaigns' ? 'border-[#af101a] ring-2 ring-[#af101a]/20' : 'border-[#E5E1DA]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#d3e4fe] text-[#0b1c30] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">campaign</span>
              </div>
              <p className="font-geist font-bold text-sm text-[#1b1c1a]">Campañas</p>
              <p className="text-xs text-[#5f5e5e]">86 Activos</p>
            </div>

            <div
              onClick={() => setSelectedCategory('Icons')}
              className={`p-4 bg-white border rounded-xl shadow-sm cursor-pointer hover:border-[#af101a] transition-all ${
                selectedCategory === 'Icons' ? 'border-[#af101a] ring-2 ring-[#af101a]/20' : 'border-[#E5E1DA]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#eae8e4] text-[#1b1c1a] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">category</span>
              </div>
              <p className="font-geist font-bold text-sm text-[#1b1c1a]">Iconos</p>
              <p className="text-xs text-[#5f5e5e]">210 Activos</p>
            </div>

            <div
              onClick={() => setSelectedCategory('Product Frames')}
              className={`p-4 bg-white border rounded-xl shadow-sm cursor-pointer hover:border-[#af101a] transition-all ${
                selectedCategory === 'Product Frames' ? 'border-[#af101a] ring-2 ring-[#af101a]/20' : 'border-[#E5E1DA]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#1a472a]/10 text-[#1a472a] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">filter_center_focus</span>
              </div>
              <p className="font-geist font-bold text-sm text-[#1b1c1a]">Marcos de Producto</p>
              <p className="text-xs text-[#5f5e5e]">48 Activos</p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-between items-center bg-white border border-[#E5E1DA] rounded-xl p-3 shadow-sm">
            <div className="flex gap-2">
              {(['All', 'Verified', 'In Draft'] as const).map((tab) => {
                const tabLabels: Record<string, string> = { All: 'Todos', Verified: 'Verificados', 'In Draft': 'En Borrador' };
                return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-[#1b1c1a] text-white'
                      : 'text-[#5f5e5e] hover:bg-[#f5f3ef]'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
                );
              })}
            </div>

            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs text-[#af101a] font-bold hover:underline"
              >
                Restablecer Categoría
              </button>
            )}
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white border border-[#E5E1DA] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="aspect-square bg-[#f5f3ef] relative overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {asset.isAIGenerated && (
                    <span className="absolute top-3 left-3 bg-[#af101a] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                      Generado por IA
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {asset.format}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-geist font-bold text-sm text-[#1b1c1a]">{asset.title}</h4>
                      <p className="text-[10px] text-[#5f5e5e]">{asset.category} • {asset.version}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      asset.status === 'Verified' ? 'bg-[#1a472a]/10 text-[#1a472a]' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {
                      asset.status === 'Verified' ? 'Verificado' :
                      asset.status === 'In Draft' ? 'En Borrador' : asset.status
                    }
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#eae8e4] flex justify-between items-center text-xs">
                    <span className="text-[10px] text-[#5f5e5e]">{asset.updated}</span>
                    <button className="text-[#af101a] hover:underline font-bold text-xs flex items-center gap-1">
                      <span>Detalles</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: COVER GENERATOR */}
      {subView === 'cover-generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Live Interactive Cover Canvas (Span 7) */}
          <div className="lg:col-span-7 bg-[#1b1c1a] rounded-2xl p-8 border border-black shadow-2xl flex flex-col items-center justify-between min-h-[580px] relative text-white overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <img src={coverImage} alt="Cover background" className="w-full h-full object-cover" />
            </div>

            {/* Cover Layout Structure */}
            <div className="w-full z-10 flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs font-mono tracking-widest text-[#af101a] font-bold uppercase">
                  REDLINE BRANDING • VOL 04-24
                </span>
                <p className="text-[10px] text-neutral-400 font-mono">EDICIÓN EMPRESARIAL</p>
              </div>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-mono rounded border border-white/20">
                Datos Protegidos
              </span>
            </div>

            {/* Title & Cover Centerpiece */}
            <div className="z-10 text-center space-y-3 my-12 max-w-md">
              <h1 className="font-geist text-4xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
                {coverTitle}
              </h1>
              <p className="text-sm font-mono tracking-widest text-red-400 font-semibold uppercase">
                {coverSubtitle}
              </p>
              <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-xs mx-auto">
                Sintetizado por Gemini Visual Intelligence para la Edición Empresarial 2026.
              </p>
            </div>

            {/* Cover Footer */}
            <div className="w-full z-10 border-t border-white/20 pt-4 flex justify-between items-end text-[10px] font-mono text-neutral-400">
              <div>
                <p>ESPECIFICACIÓN AUTOGEN: REF-9921-X</p>
                <p className="text-neutral-500">La IA genera solo gráficos. Metadatos reales de BD incrustados.</p>
              </div>
              <div className="w-12 h-12 bg-white p-1 rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-black text-2xl">qr_code_2</span>
              </div>
            </div>

            {/* Iterations Tray */}
            <div className="w-full z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-400 text-[11px]">Iteraciones Alternativas</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded border-2 border-[#af101a] overflow-hidden cursor-pointer">
                  <img src={coverImage} alt="Iter 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded border border-white/30 overflow-hidden cursor-pointer opacity-60 hover:opacity-100">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE9nCeIhSfpdrh1x1wSMzMfBEQY_pvk711ZAxKasGxwPI0iC-7ziaHwsTIhCvYi4lkSw6OZjf1BSoUAsOfCZHU_tX7QzaUlIuTYrrGuJdUYqY37nb9pxjvcIWkvoEzuxjMhFo2ybYIImTD1DGQNl4PQUWDEjKGLaJjGbsJofr4ETbGWfMHYwAUdeNJHMYVQkdxQALBLr7yndAUGyCf6emdP6LkmIQi2ROHeT_hWbjNZsDz_lq7i0R6ZbzVz_dr_ZNYW33Uxgc6MS2S" alt="Iter 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls Panel: Design Intelligence (Span 5) */}
          <div className="lg:col-span-5 bg-white border border-[#E5E1DA] rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="font-geist text-[20px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#af101a]">auto_awesome</span>
Inteligencia de Diseño
            </h3>

            {/* Prompt Textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
                Prompt de Dirección de Arte
              </label>
              <textarea
                rows={4}
                value={coverPrompt}
                onChange={(e) => setCoverPrompt(e.target.value)}
                className="w-full bg-[#f5f3ef] border border-[#e4beba]/80 rounded-xl p-3 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#af101a]"
                placeholder="Describe your desired cover aesthetics..."
              />
            </div>

            {/* Visual Style Switcher */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
                Arquetipo de Estilo Visual
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Minimalist', 'Cinematic', 'Product Focus', 'Abstract'].map((style) => {
                  const styleLabels: Record<string, string> = { Minimalist: 'Minimalista', Cinematic: 'Cinematográfico', 'Product Focus': 'Enfoque Producto', Abstract: 'Abstracto' };
                  return (
                  <button
                    key={style}
                    onClick={() => setCoverStyle(style)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      coverStyle === style
                        ? 'bg-[#af101a] text-white border-[#af101a]'
                        : 'bg-[#f5f3ef] text-[#1b1c1a] border-[#eae8e4] hover:bg-[#eae8e4]'
                    }`}
                  >
                    {styleLabels[style]}
                  </button>
                  );
                })}
              </div>
            </div>

            {/* Safety Protocol & Aspect Ratio */}
            <div className="p-3 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#5f5e5e]">
                <span>Objetivo de Color:</span>
                <span className="font-mono font-bold text-[#1b1c1a]">#AF101A Primary Accent</span>
              </div>
              <div className="flex justify-between items-center text-[#5f5e5e]">
                <span>Formato de Exportación:</span>
                <span className="font-mono font-bold text-[#1b1c1a]">Vector PDF / 300 DPI</span>
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerateCover}
              disabled={isGeneratingCover}
              className="w-full py-3.5 bg-[#af101a] text-white rounded-xl font-geist font-bold text-sm hover:brightness-110 active:scale-[0.98] shadow-lg shadow-[#af101a]/20 transition-all flex items-center justify-center gap-2"
            >
              <span className={`material-symbols-outlined text-[20px] ${isGeneratingCover ? 'animate-spin' : ''}`}>
                auto_awesome
              </span>
              <span>{isGeneratingCover ? 'Generando Visuales de Portada...' : 'GENERAR PORTADA'}</span>
            </button>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: ICON DESIGNER */}
      {subView === 'icon-designer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Generated Icons Grid (Span 7) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E1DA] rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="font-geist text-[20px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3 flex items-center justify-between">
              <span>Conjunto de Vectores Generados</span>
              <span className="text-xs font-mono text-[#af101a] font-bold">4 Variaciones SVG</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] flex flex-col items-center justify-center gap-3 hover:border-[#af101a] transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-5xl text-[#af101a] group-hover:scale-110 transition-transform">
                  watch
                </span>
                <span className="text-xs font-bold text-[#1b1c1a]">V1 Enfoque Estructural</span>
              </div>

              <div className="p-6 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] flex flex-col items-center justify-center gap-3 hover:border-[#af101a] transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-5xl text-[#1b1c1a] group-hover:scale-110 transition-transform">
                  precision_manufacturing
                </span>
                <span className="text-xs font-bold text-[#1b1c1a]">V2 Duotono Acentuado</span>
              </div>

              <div className="p-6 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] flex flex-col items-center justify-center gap-3 hover:border-[#af101a] transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-5xl text-[#af101a] group-hover:scale-110 transition-transform">
                  diamond
                </span>
                <span className="text-xs font-bold text-[#1b1c1a]">V3 Minimalismo Audaz</span>
              </div>

              <div className="p-6 bg-[#f5f3ef] rounded-xl border border-[#eae8e4] flex flex-col items-center justify-center gap-3 hover:border-[#af101a] transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-5xl text-[#1b1c1a] group-hover:scale-110 transition-transform">
                  shutter_speed
                </span>
                <span className="text-xs font-bold text-[#1b1c1a]">V4 Detalle Intrincado</span>
              </div>
            </div>
          </div>

          {/* Right Icon Assistant Panel (Span 5) */}
          <div className="lg:col-span-5 bg-white border border-[#E5E1DA] rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="font-geist text-[20px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3">
              Controles de Generación de Iconos
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
                Concepto del Prompt
              </label>
              <input
                type="text"
                value={iconPrompt}
                onChange={(e) => setIconPrompt(e.target.value)}
                className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#af101a]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
                Grosor de Trazo ({strokeWeight}px)
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={strokeWeight}
                onChange={(e) => setStrokeWeight(Number(e.target.value))}
                className="w-full accent-[#af101a]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">
                Redondeo de Esquinas ({cornerRoundness}px)
              </label>
              <input
                type="range"
                min="0"
                max="12"
                value={cornerRoundness}
                onChange={(e) => setCornerRoundness(Number(e.target.value))}
                className="w-full accent-[#af101a]"
              />
            </div>

            <button
              onClick={handleGenerateIcons}
              disabled={isGeneratingIcons}
              className="w-full py-3 bg-[#1b1c1a] text-white rounded-xl font-bold text-xs hover:bg-black transition-all flex items-center justify-center gap-2 shadow"
            >
              <span className={`material-symbols-outlined text-[18px] ${isGeneratingIcons ? 'animate-spin' : ''}`}>
                auto_awesome
              </span>
              <span>{isGeneratingIcons ? 'Sintetizando SVG...' : 'Generar Iconos'}</span>
            </button>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: COMPONENT EXTRACTOR */}
      {subView === 'extractor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Processing Circle & Stats (Span 4) */}
          <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3">
              Inteligencia de Extracción
            </h3>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="transparent" stroke="#eae8e4" strokeWidth="8" />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    fill="transparent"
                    stroke="#af101a"
                    strokeWidth="8"
                    strokeDasharray="301.5"
                    strokeDashoffset="45"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-geist text-2xl font-bold text-[#1b1c1a]">85%</span>
              </div>
              <p className="text-xs font-bold text-[#1b1c1a]">128 / 150 Capas Analizadas</p>
              <p className="text-[10px] text-[#5f5e5e]">Modelo de Objeto InDesign INDD</p>
            </div>

            <div className="p-3 bg-[#f5f3ef] rounded-xl text-xs space-y-1">
              <p className="font-bold text-[#af101a] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">lightbulb</span> Consejo IA
              </p>
              <p className="text-[#5f5e5e]">
                Se encontraron 3 componentes reutilizables adecuados para plantillas de catálogo globales.
              </p>
            </div>
          </div>

          {/* Canvas Component Bounding Box Visualizer (Span 8) */}
          <div className="lg:col-span-8 bg-white border border-[#E5E1DA] rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-3">
              Cajas Delimitadoras de Componentes Detectados
            </h3>

            <div className="space-y-3">
              {['Pricing Table', 'Technical Spec Icons', 'Product Hero Card'].map((comp) => {
                const isChecked = selectedComponents.includes(comp);
                return (
                  <div
                    key={comp}
                    onClick={() => {
                      if (isChecked) {
                        setSelectedComponents(selectedComponents.filter((c) => c !== comp));
                      } else {
                        setSelectedComponents([...selectedComponents, comp]);
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                      isChecked ? 'bg-[#ffdad6]/20 border-[#af101a]' : 'bg-[#f5f3ef] border-[#eae8e4]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={isChecked} readOnly className="rounded border-[#e4beba]" />
                      <div>
                        <p className="font-bold text-xs text-[#1b1c1a]">{comp}</p>
                        <p className="text-[10px] text-[#5f5e5e]">Auto-extraído de la Capa #4</p>
                      </div>
                    </div>

                    <button className="px-3 py-1 bg-[#af101a] text-white rounded text-[10px] font-bold">
                      Agregar a la Biblioteca
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
