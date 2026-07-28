import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { NavigationSection, AIAssetsSubView, Project, ProductItem, TemplateVariable, AIAssetItem, ExportHistoryItem } from './types';
import {
  initialProjects,
  initialProducts,
  initialVariables,
  initialAIAssets,
  initialConnections,
  initialExportHistory,
} from './data/mockData';

import { DashboardView } from './views/DashboardView';
import { ProjectsView } from './views/ProjectsView';
import { ProductsView } from './views/ProductsView';
import { TemplatesView } from './views/TemplatesView';
import { AIAssetsView } from './views/AIAssetsView';
import { CatalogPreviewView } from './views/CatalogPreviewView';
import { SynchronizationView } from './views/SynchronizationView';
import { ExportCenterView } from './views/ExportCenterView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavigationSection>('dashboard');
  const [aiSubView, setAiSubView] = useState<AIAssetsSubView>('library');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // App Global Collections
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [variables, setVariables] = useState<TemplateVariable[]>(initialVariables);
  const [assets, setAssets] = useState<AIAssetItem[]>(initialAIAssets);
  const [exportHistory, setExportHistory] = useState<ExportHistoryItem[]>(initialExportHistory);

  const handleCreateProject = (newProj: Project) => {
    setProjects([newProj, ...projects]);
  };

  const handleAddProduct = (newProd: ProductItem) => {
    setProducts([newProd, ...products]);
  };

  const handleAddAsset = (newAsset: AIAssetItem) => {
    setAssets([newAsset, ...assets]);
  };

  const handleAddExport = (newExport: ExportHistoryItem) => {
    setExportHistory([newExport, ...exportHistory]);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans antialiased flex">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={(sec) => {
          setCurrentSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Top Header Navigation */}
      <TopNav
        currentSection={currentSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        aiSubView={aiSubView}
        onAISubViewChange={setAiSubView}
        onQuickAction={() => {
          if (currentSection === 'projects') setCurrentSection('projects');
          else if (currentSection === 'products') setCurrentSection('products');
          else setCurrentSection('projects');
        }}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 ml-64 mt-16 p-8 min-w-0 overflow-x-hidden">
        {currentSection === 'dashboard' && (
          <DashboardView onNavigate={setCurrentSection} />
        )}

        {currentSection === 'projects' && (
          <ProjectsView
            projects={projects}
            onNavigate={setCurrentSection}
            onCreateProject={handleCreateProject}
            searchQuery={searchQuery}
          />
        )}

        {currentSection === 'products' && (
          <ProductsView
            products={products}
            searchQuery={searchQuery}
            onAddProduct={handleAddProduct}
          />
        )}

        {currentSection === 'templates' && (
          <TemplatesView
            variables={variables}
            onUpdateVariables={setVariables}
          />
        )}

        {currentSection === 'ai-assets' && (
          <AIAssetsView
            assets={assets}
            subView={aiSubView}
            onSubViewChange={setAiSubView}
            onAddAsset={handleAddAsset}
          />
        )}

        {currentSection === 'preview' && <CatalogPreviewView />}

        {currentSection === 'sync' && (
          <SynchronizationView connections={initialConnections} />
        )}

        {currentSection === 'export' && (
          <ExportCenterView
            exportHistory={exportHistory}
            onAddExport={handleAddExport}
          />
        )}

        {currentSection === 'settings' && <SettingsView />}
      </main>
    </div>
  );
}
