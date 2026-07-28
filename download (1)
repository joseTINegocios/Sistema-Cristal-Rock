import React, { useState } from 'react';

export const CatalogPreviewView: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'DATA' | 'METADATA' | 'HISTORY'>('DATA');
  const [priceSynced, setPriceSynced] = useState<boolean>(false);

  const handleUpdateVariable = () => {
    setPriceSynced(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Thumbnail Navigator (Span 3) */}
      <div className="lg:col-span-3 bg-white border border-[#E5E1DA] rounded-xl p-4 space-y-4 shadow-sm">
        <h3 className="font-geist text-sm font-bold text-[#1b1c1a] border-b border-[#eae8e4] pb-2 flex items-center justify-between">
          <span>Pages Navigator</span>
          <span className="text-[10px] text-[#5f5e5e] font-mono">12 Pages Total</span>
        </h3>

        <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 scrollbar-hide">
          <div
            onClick={() => setActivePage(1)}
            className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${
              activePage === 1 ? 'bg-[#ffdad6]/30 border-[#af101a]' : 'bg-[#f5f3ef] border-[#eae8e4]'
            }`}
          >
            <div className="w-12 h-16 bg-[#e2dfde] rounded overflow-hidden relative flex-shrink-0 border">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL9SIoI1ogg4AzLf_GEOYmeXDNLkgZi0_TZgkQSfvMnUXK0AeqRFX9dN8MGbxUvyeHsRde9VZiEydqQbb_2X3SOMk-fBrAn145hfU7y4reDRx6xsFCO7G6BiQdhEsk0gcxh8x6E5pQFFN-F8RRHbM0OW2xB48S1NbSJ9NnoY8BU0HzwNrabk65N_nmHdt4FVECwXESf3STzyvaKdrYceZJi0WFhDzbp4lhaMOPG5Y4YlJq5Gjtqn4YcIfIXdy-M_78IrOahOgTUCkw"
                alt="Page 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1b1c1a]">01 Cover Page</p>
              {!priceSynced ? (
                <span className="text-[9px] bg-[#af101a] text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Outdated
                </span>
              ) : (
                <span className="text-[9px] bg-[#1a472a] text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Synced
                </span>
              )}
            </div>
          </div>

          <div
            onClick={() => setActivePage(2)}
            className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${
              activePage === 2 ? 'bg-[#ffdad6]/30 border-[#af101a]' : 'bg-[#f5f3ef] border-[#eae8e4]'
            }`}
          >
            <div className="w-12 h-16 bg-[#e2dfde] rounded flex items-center justify-center font-mono text-xs text-[#5f5e5e] border">
              02
            </div>
            <div>
              <p className="text-xs font-bold text-[#1b1c1a]">02 Introduction</p>
              <span className="text-[9px] bg-[#1a472a]/10 text-[#1a472a] font-bold px-1.5 py-0.5 rounded uppercase">
                Validated
              </span>
            </div>
          </div>

          <div
            onClick={() => setActivePage(3)}
            className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${
              activePage === 3 ? 'bg-[#ffdad6]/30 border-[#af101a]' : 'bg-[#f5f3ef] border-[#eae8e4]'
            }`}
          >
            <div className="w-12 h-16 bg-[#e2dfde] rounded flex items-center justify-center font-mono text-xs text-[#5f5e5e] border">
              03
            </div>
            <div>
              <p className="text-xs font-bold text-[#1b1c1a]">03 Premium Tech</p>
              <span className="text-[9px] bg-[#1a472a]/10 text-[#1a472a] font-bold px-1.5 py-0.5 rounded uppercase">
                Validated
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Page Canvas (Span 6) */}
      <div className="lg:col-span-6 bg-[#eae8e4] border border-[#E5E1DA] rounded-xl overflow-hidden shadow-inner flex flex-col min-h-[580px] relative preview-canvas">
        {/* Floating Toolbar */}
        <div className="bg-[#f5f3ef] border-b border-[#eae8e4] px-4 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage <= 1}
              className="p-1 hover:bg-[#eae8e4] rounded disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <span className="font-mono text-xs font-bold text-[#1b1c1a]">
              Page 0{activePage} of 12
            </span>
            <button
              onClick={() => setActivePage((p) => Math.min(12, p + 1))}
              disabled={activePage >= 12}
              className="p-1 hover:bg-[#eae8e4] rounded disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          <span className="font-mono text-[11px] text-[#5f5e5e]">85% Zoom</span>
        </div>

        {/* Catalog Preview Sheet */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="w-[420px] bg-white shadow-2xl rounded p-6 border border-[#d2ceca] space-y-4 relative">
            <div className="flex justify-between items-start border-b border-[#1b1c1a] pb-3">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#af101a] font-bold">
                  ZEITGEIST COLLECTION 2024
                </span>
                <h3 className="font-geist text-xl font-bold text-[#1b1c1a]">Vanguard Chrono</h3>
              </div>

              <div className="text-right">
                <p className="font-geist text-lg font-bold text-[#af101a]">
                  {priceSynced ? '$15,200.00' : '$14,500.00'}
                </p>
                {!priceSynced && (
                  <span className="px-2 py-0.5 bg-[#af101a] text-white text-[8px] font-bold rounded uppercase animate-pulse">
                    OUTDATED ASSET
                  </span>
                )}
              </div>
            </div>

            <div className="aspect-square bg-[#f5f3ef] rounded overflow-hidden border border-[#eae8e4]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL9SIoI1ogg4AzLf_GEOYmeXDNLkgZi0_TZgkQSfvMnUXK0AeqRFX9dN8MGbxUvyeHsRde9VZiEydqQbb_2X3SOMk-fBrAn145hfU7y4reDRx6xsFCO7G6BiQdhEsk0gcxh8x6E5pQFFN-F8RRHbM0OW2xB48S1NbSJ9NnoY8BU0HzwNrabk65N_nmHdt4FVECwXESf3STzyvaKdrYceZJi0WFhDzbp4lhaMOPG5Y4YlJq5Gjtqn4YcIfIXdy-M_78IrOahOgTUCkw"
                alt="Watch Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-[11px] text-[#5f5e5e] leading-relaxed">
              Crafted with titanium grade 5 chassis, water-resistant up to 300 meters.
            </p>
          </div>
        </div>
      </div>

      {/* Right Data & Inspector Panel (Span 3) */}
      <div className="lg:col-span-3 bg-white border border-[#E5E1DA] rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex border-b border-[#eae8e4] text-xs font-bold text-[#5f5e5e]">
          <button
            onClick={() => setActiveTab('DATA')}
            className={`flex-1 pb-2 transition-all ${
              activeTab === 'DATA' ? 'text-[#af101a] border-b-2 border-[#af101a]' : 'hover:text-[#1b1c1a]'
            }`}
          >
            DATA
          </button>
          <button
            onClick={() => setActiveTab('METADATA')}
            className={`flex-1 pb-2 transition-all ${
              activeTab === 'METADATA' ? 'text-[#af101a] border-b-2 border-[#af101a]' : 'hover:text-[#1b1c1a]'
            }`}
          >
            METADATA
          </button>
        </div>

        {activeTab === 'DATA' && (
          <div className="space-y-4 text-xs">
            {/* Sync Issue Card */}
            {!priceSynced ? (
              <div className="p-3 bg-[#ffdad6]/30 border border-[#af101a] rounded-xl space-y-2">
                <p className="font-bold text-[#af101a] flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-sm">warning</span> Sync Issue
                </p>
                <p className="text-[11px] text-[#1b1c1a]">
                  Product price <strong>$14,500.00</strong> is out of sync with DB master (<strong>$15,200.00</strong>).
                </p>
                <button
                  onClick={handleUpdateVariable}
                  className="w-full py-1.5 bg-[#af101a] text-white rounded text-[10px] font-bold hover:brightness-110 shadow-sm"
                >
                  UPDATE VARIABLE
                </button>
              </div>
            ) : (
              <div className="p-3 bg-[#1a472a]/10 border border-[#1a472a]/30 rounded-xl space-y-1">
                <p className="font-bold text-[#1a472a] flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Fully Synced
                </p>
                <p className="text-[11px] text-[#1b1c1a]">
                  All catalog variables match master database values.
                </p>
              </div>
            )}

            <div>
              <p className="font-bold text-[#5f5e5e] uppercase text-[10px] mb-2">Bound Product</p>
              <div className="p-2.5 bg-[#f5f3ef] rounded-lg border border-[#eae8e4]">
                <p className="font-bold text-[#1b1c1a]">Vanguard Chrono Titanium</p>
                <p className="text-[10px] font-mono text-[#af101a]">ID: WH-992-AX</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'METADATA' && (
          <div className="space-y-2 text-xs text-[#5f5e5e]">
            <div className="flex justify-between py-1 border-b border-[#eae8e4]">
              <span>Template ID:</span>
              <span className="font-mono text-[#1b1c1a]">Luxe_Grid_v2.4</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#eae8e4]">
              <span>Render Engine:</span>
              <span className="font-mono text-[#1b1c1a]">AI Studio Vector</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
