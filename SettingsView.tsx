import React, { useState } from 'react';
import { Project, NavigationSection } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  onNavigate: (section: NavigationSection) => void;
  onCreateProject: (newProj: Project) => void;
  searchQuery: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onNavigate,
  onCreateProject,
  searchQuery,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjTemplate, setNewProjTemplate] = useState('Standard Grid v1');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || p.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const created: Project = {
      id: `proj-${Date.now()}`,
      name: newProjName,
      status: 'Draft',
      lastUpdate: 'Just now',
      productsCount: 0,
      pagesCount: 0,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGbf6lvheS51vHczvmFvWT6MyTV4Kqm56X046IceV7_esivvJo-gsCjL4GNYY1JICCzo4MTJdOBst1P9NtTj9JSXaoaDu1PLwjt6o-nORWUHNfxnT85MacgW6HPKPM3Xw2C--0l0cYhfev5-rJLbCeu45G1yAC1pAjh8ZiBHDn8Y-oUVjRWfMxmg6xUrNaMWIQGvBdSX9KY0qHNVQV40ybvkSb9cklFIaMW_jO7hcd0kyJM7tlHyoTlsNKNEgaxCaRDXkeNicNfq3G',
      dataSources: [],
      templates: { name: newProjTemplate, tag: 'Standard' },
      aiAssets: []
    };

    onCreateProject(created);
    setNewProjName('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-geist text-[32px] font-semibold text-[#1b1c1a] tracking-tight">
            Catalog Projects
          </h2>
          <p className="text-[#5f5e5e] text-base mt-1">
            Manage and orchestrate your enterprise AI-driven catalogs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-[#eae8e4] text-[#1b1c1a] rounded-lg text-xs font-bold focus:outline-none cursor-pointer pr-8"
            >
              <option value="all">All Statuses</option>
              <option value="syncing">Syncing</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-[#af101a] text-white rounded-lg font-bold text-xs hover:brightness-110 shadow-lg shadow-[#af101a]/10 transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Project
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-[#ffffff] border border-[#e4beba]/30 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#af101a]/5 transition-all duration-300"
          >
            <div className="flex flex-col xl:flex-row h-full">
              {/* Project Preview Image & Status Badge */}
              <div className="xl:w-1/4 h-48 xl:h-auto relative overflow-hidden bg-[#f5f3ef]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img
                  src={project.image}
                  alt={project.name}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                    project.status === 'Draft' ? 'grayscale opacity-80' : ''
                  }`}
                />
                <div className="absolute top-4 left-4 z-20">
                  {project.status === 'Syncing' && (
                    <span className="px-3 py-1 bg-[#d32f2f] text-white text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                      <span className="material-symbols-outlined text-[12px] filled-icon">sync</span>
                      Syncing
                    </span>
                  )}
                  {project.status === 'Published' && (
                    <span className="px-3 py-1 bg-[#1a472a] text-white text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[12px] filled-icon">check_circle</span>
                      Published
                    </span>
                  )}
                  {project.status === 'Draft' && (
                    <span className="px-3 py-1 bg-[#e4e2de] text-[#5f5e5e] text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[12px] filled-icon">edit_note</span>
                      Draft
                    </span>
                  )}
                </div>
              </div>

              {/* Project Content Info */}
              <div className="flex-grow p-6 flex flex-col justify-between gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-geist text-[22px] font-semibold text-[#1b1c1a]">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[#5f5e5e] mt-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {project.lastUpdate}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="font-geist text-[18px] font-bold text-[#1b1c1a]">
                        {project.productsCount.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#5f5e5e] uppercase font-bold tracking-tight">
                        Products
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-geist text-[18px] font-bold text-[#1b1c1a]">
                        {project.pagesCount.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#5f5e5e] uppercase font-bold tracking-tight">
                        Pages
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subgrid Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Data Sources */}
                  <div className="p-3 bg-[#f5f3ef] rounded-lg border border-[#eae8e4]">
                    <p className="text-xs font-bold text-[#5f5e5e] flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[16px] text-[#af101a]">database</span>
                      Data Sources
                    </p>
                    {project.dataSources.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {project.dataSources.map((ds, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-white text-[11px] border border-[#e4beba]/40 rounded text-[#1b1c1a]"
                          >
                            {ds}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs italic text-[#5f5e5e]">None assigned</p>
                    )}
                  </div>

                  {/* Templates */}
                  <div className="p-3 bg-[#f5f3ef] rounded-lg border border-[#eae8e4]">
                    <p className="text-xs font-bold text-[#5f5e5e] flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[16px] text-[#af101a]">description</span>
                      Templates
                    </p>
                    <p className="text-xs text-[#1b1c1a] font-medium flex items-center justify-between">
                      <span>{project.templates.name}</span>
                      <span className="text-[10px] bg-[#d3e4fe] text-[#0b1c30] px-1.5 py-0.5 rounded font-bold">
                        {project.templates.tag}
                      </span>
                    </p>
                  </div>

                  {/* AI Assets */}
                  <div className="p-3 bg-[#f5f3ef] rounded-lg border border-[#eae8e4]">
                    <p className="text-xs font-bold text-[#5f5e5e] flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[16px] text-[#af101a]">psychology</span>
                      AI Assets
                    </p>
                    {project.aiAssets.length > 0 ? (
                      <div className="flex items-center -space-x-1">
                        {project.aiAssets.map((asset, idx) => (
                          <div
                            key={idx}
                            title={asset.label}
                            className={`w-6 h-6 rounded-full ${asset.bg} text-[10px] flex items-center justify-center font-bold border-2 border-white shadow-sm cursor-help`}
                          >
                            {asset.code}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs italic text-[#5f5e5e]">None assigned</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Sidebar Controls */}
              <div className="xl:w-48 border-t xl:border-t-0 xl:border-l border-[#eae8e4] p-4 flex xl:flex-col justify-center items-stretch gap-2 bg-[#fbf9f5]/50">
                <button
                  onClick={() => onNavigate('preview')}
                  className="flex-1 py-2.5 bg-white hover:bg-[#eae8e4] text-[#1b1c1a] border border-[#e4beba]/40 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>{project.status === 'Published' ? 'View Live' : 'Preview'}</span>
                </button>

                <button
                  onClick={() => onNavigate('templates')}
                  className="flex-1 py-2.5 bg-white hover:bg-[#eae8e4] text-[#1b1c1a] border border-[#e4beba]/40 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  <span>{project.status === 'Published' ? 'Revisions' : 'Configure'}</span>
                </button>

                <button
                  onClick={() => onNavigate('sync')}
                  title="Synchronization Settings"
                  className="p-2.5 bg-white hover:text-[#af101a] text-[#5f5e5e] border border-[#e4beba]/40 rounded-lg transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="mt-8 flex items-center justify-between py-4 border-t border-[#eae8e4]">
        <p className="text-xs text-[#5f5e5e]">
          Showing <span className="font-bold text-[#1b1c1a]">{filteredProjects.length}</span> of{' '}
          <span className="font-bold text-[#1b1c1a]">{projects.length}</span> projects
        </p>
        <div className="flex gap-1.5">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#eae8e4] text-[#5f5e5e] hover:bg-[#f5f3ef]">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#af101a] text-white font-bold text-xs">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#eae8e4] text-[#1b1c1a] hover:bg-[#f5f3ef] text-xs">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#eae8e4] text-[#5f5e5e] hover:bg-[#f5f3ef]">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#eae8e4] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#eae8e4] pb-3">
              <h3 className="font-geist text-lg font-bold text-[#1b1c1a]">Create New Catalog Project</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#5f5e5e] hover:text-[#af101a]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#5f5e5e] mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  placeholder="e.g. Spring Luxury Watches 2027"
                  className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2.5 focus:outline-none focus:border-[#af101a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5f5e5e] mb-1">Base Layout Template</label>
                <select
                  value={newProjTemplate}
                  onChange={(e) => setNewProjTemplate(e.target.value)}
                  className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2.5 focus:outline-none focus:border-[#af101a]"
                >
                  <option value="Luxe Grid v2.4">Luxe Grid v2.4 (High Fashion)</option>
                  <option value="Tech Specs v1.1">Tech Specs v1.1 (Industrial)</option>
                  <option value="Beauty Standard v1">Beauty Standard v1 (Cosmetics)</option>
                  <option value="Minimal Grid 4x8">Minimal Grid 4x8</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-[#eae8e4] rounded-lg font-bold text-[#5f5e5e] hover:bg-[#f5f3ef]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#af101a] text-white font-bold rounded-lg hover:brightness-110 shadow-md"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
