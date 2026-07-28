import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState<string>('#AF101A');
  const [modelName, setModelName] = useState<string>('gemini-2.5-flash');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="font-geist text-[28px] font-semibold text-[#1b1c1a]">
          Catalog Settings & Configuration
        </h2>
        <p className="text-xs text-[#5f5e5e]">
          Manage global AI parameters, brand palette tokens, and API credentials.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white border border-[#E5E1DA] rounded-xl p-6 space-y-6 shadow-sm">
        {savedSuccess && (
          <div className="p-3 bg-[#1a472a]/10 border border-[#1a472a]/30 text-[#1a472a] rounded-lg text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Settings saved successfully!
          </div>
        )}

        {/* Brand Tokens */}
        <div className="space-y-3 border-b border-[#eae8e4] pb-6">
          <h3 className="font-geist text-base font-bold text-[#1b1c1a]">Brand Aesthetics</h3>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#5f5e5e] mb-1">Primary Accent Token</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded border cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="bg-[#f5f3ef] border border-[#e4beba] rounded p-2 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#5f5e5e] mb-1">Typography Pairing</label>
              <select className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded p-2 text-xs font-medium">
                <option>Inter (Body) + Geist (Display)</option>
                <option>System Sans + Serif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gemini Engine Parameters */}
        <div className="space-y-3">
          <h3 className="font-geist text-base font-bold text-[#1b1c1a]">Gemini Engine Selection</h3>

          <div className="text-xs space-y-3">
            <div>
              <label className="block font-bold text-[#5f5e5e] mb-1">Target Model</label>
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded p-2 text-xs font-mono font-bold"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash (Fast & Multimodal)</option>
                <option value="gemini-2.5-pro">gemini-2.5-pro (High Precision Reasoning)</option>
              </select>
            </div>

            <div className="p-3 bg-[#f5f3ef] rounded-lg border border-[#eae8e4] text-[11px] text-[#5f5e5e]">
              <p className="font-bold text-[#1b1c1a] mb-1">API Key Management</p>
              <p>GEMINI_API_KEY is configured via the AI Studio Secrets Manager and automatically passed to server-side functions.</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#af101a] text-white font-bold text-xs rounded-lg hover:brightness-110 shadow-sm"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
};
