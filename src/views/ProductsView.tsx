import React, { useState } from 'react';
import { ProductItem } from '../types';

interface ProductsViewProps {
  products: ProductItem[];
  searchQuery: string;
  onAddProduct: (prod: ProductItem) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  searchQuery,
  onAddProduct,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(products[0] || null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product state
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('Vanguard Labs');
  const [newCategory, setNewCategory] = useState('Wearables');
  const [newPrice, setNewPrice] = useState('299.00');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const matchesStat = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesCat && matchesStat;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSku || !newName) return;

    const created: ProductItem = {
      id: `product-${Date.now()}`,
      sku: newSku,
      name: newName,
      subtitle: `${newBrand} / Premium Edition`,
      category: newCategory,
      brand: newBrand,
      price: parseFloat(newPrice) || 199.00,
      status: 'Active',
      updated: 'Just now',
      catalogsCount: [1],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL9SIoI1ogg4AzLf_GEOYmeXDNLkgZi0_TZgkQSfvMnUXK0AeqRFX9dN8MGbxUvyeHsRde9VZiEydqQbb_2X3SOMk-fBrAn145hfU7y4reDRx6xsFCO7G6BiQdhEsk0gcxh8x6E5pQFFN-F8RRHbM0OW2xB48S1NbSJ9NnoY8BU0HzwNrabk65N_nmHdt4FVECwXESf3STzyvaKdrYceZJi0WFhDzbp4lhaMOPG5Y4YlJq5Gjtqn4YcIfIXdy-M_78IrOahOgTUCkw',
      details: {
        lastManualUpdate: 'Just now',
        wholesalePrice: parseFloat(newPrice) * 0.7,
        leadTime: '1 Week',
        affectedCatalogs: [
          { title: 'Global Master Catalog', page: 'Page 1' }
        ]
      }
    };

    onAddProduct(created);
    setSelectedProduct(created);
    setShowAddModal(false);
    setNewSku('');
    setNewName('');
  };

  return (
    <div className="space-y-6 relative">
      {/* Top Filter Bar */}
      <div className="bg-white border border-[#E5E1DA] rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-[#f5f3ef] border border-[#e4beba]/60 rounded-lg text-xs font-bold text-[#1b1c1a] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Review">Review</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-[#f5f3ef] border border-[#e4beba]/60 rounded-lg text-xs font-bold text-[#1b1c1a] focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Wearables">Wearables</option>
            <option value="Audio Gear">Audio Gear</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Office">Office</option>
          </select>

          {(filterCategory !== 'all' || filterStatus !== 'all') && (
            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterStatus('all');
              }}
              className="text-xs text-[#af101a] font-bold hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-[#eae8e4] hover:bg-[#f5f3ef] rounded-lg text-xs font-bold text-[#5f5e5e] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#af101a] text-white rounded-lg text-xs font-bold hover:brightness-110 flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Product
          </button>
        </div>
      </div>

      {/* Main Content Layout with Side Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Column (Span 8 or 12) */}
        <div className={`${selectedProduct ? 'lg:col-span-8' : 'lg:col-span-12'} bg-white border border-[#E5E1DA] rounded-xl overflow-hidden shadow-sm transition-all duration-300`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1b1c1a]">
              <thead className="bg-[#f5f3ef] border-b border-[#eae8e4] font-geist text-[#5f5e5e] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 w-10">
                    <input type="checkbox" className="rounded border-[#e4beba]" />
                  </th>
                  <th className="p-4">Product Info</th>
                  <th className="p-4">Category & Brand</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Updated</th>
                  <th className="p-4 text-right">Catalogs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e4]">
                {filteredProducts.map((p) => {
                  const isSelected = selectedProduct?.id === p.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#ffdad6]/30 border-l-4 border-l-[#af101a]' : 'hover:bg-[#f5f3ef]/60'
                      }`}
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-[#e4beba]" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border border-[#e4beba]/40 bg-[#f5f3ef]"
                          />
                          <div>
                            <p className="font-bold text-[#1b1c1a] text-sm">{p.name}</p>
                            <p className="text-[10px] text-[#5f5e5e] font-mono">{p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-[#1b1c1a]">{p.category}</p>
                        <p className="text-[10px] text-[#5f5e5e]">{p.brand}</p>
                      </td>
                      <td className="p-4 font-geist font-bold text-[#1b1c1a]">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="p-4">
                        {p.status === 'Active' && (
                          <span className="px-2.5 py-1 bg-[#1a472a]/10 text-[#1a472a] rounded-full text-[10px] font-bold">
                            Active
                          </span>
                        )}
                        {p.status === 'Review' && (
                          <span className="px-2.5 py-1 bg-[#d3e4fe] text-[#0b1c30] rounded-full text-[10px] font-bold">
                            Review
                          </span>
                        )}
                        {p.status === 'Out of Stock' && (
                          <span className="px-2.5 py-1 bg-[#eae8e4] text-[#5f5e5e] rounded-full text-[10px] font-bold">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-[#5f5e5e] text-[11px]">{p.updated}</td>
                      <td className="p-4 text-right">
                        {p.catalogsCount.length > 0 ? (
                          <span className="px-2 py-1 bg-[#af101a]/10 text-[#af101a] font-bold rounded text-[11px]">
                            {p.catalogsCount.reduce((a, b) => a + b, 0)} Placements
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#5f5e5e] italic">Unassigned</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Insights Side Drawer Panel (Span 4) */}
        {selectedProduct && (
          <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-xl p-6 space-y-6 shadow-md relative sticky top-20">
            <div className="flex items-center justify-between border-b border-[#eae8e4] pb-3">
              <h3 className="font-geist text-[18px] font-bold text-[#1b1c1a] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#af101a]">analytics</span>
                Product Insights
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#5f5e5e] hover:text-[#af101a] p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Product Overview Header */}
            <div className="flex gap-4 items-center bg-[#f5f3ef] p-3 rounded-xl border border-[#eae8e4]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 rounded-lg object-cover border border-[#e4beba]"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-geist font-bold text-[#1b1c1a] truncate">{selectedProduct.name}</h4>
                <p className="text-xs font-mono text-[#af101a]">{selectedProduct.sku}</p>
                <p className="text-[11px] text-[#5f5e5e]">{selectedProduct.brand}</p>
              </div>
            </div>

            {/* Sync History Timeline */}
            <div>
              <h5 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider mb-3">
                Synchronization History
              </h5>
              <div className="space-y-3 border-l-2 border-[#eae8e4] pl-3 ml-2">
                <div className="relative">
                  <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#af101a]"></span>
                  <p className="text-xs font-bold text-[#1b1c1a]">PIM Master Price Sync</p>
                  <p className="text-[10px] text-[#5f5e5e]">Today, 14:22 • Updated by SAP Connector</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#eae8e4]"></span>
                  <p className="text-xs font-bold text-[#1b1c1a]">AI Copy Polish</p>
                  <p className="text-[10px] text-[#5f5e5e]">Yesterday, 09:15 • Semantic Agent v4</p>
                </div>
              </div>
            </div>

            {/* Affected Catalogs */}
            <div>
              <h5 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider mb-2">
                Affected Catalogs ({selectedProduct.details?.affectedCatalogs?.length || 0})
              </h5>
              <div className="space-y-2">
                {selectedProduct.details?.affectedCatalogs?.map((cat, idx) => (
                  <div key={idx} className="p-2.5 bg-[#fbf9f5] rounded-lg border border-[#eae8e4] flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-[#1b1c1a]">{cat.title}</p>
                      <p className="text-[10px] text-[#5f5e5e]">{cat.page}</p>
                    </div>
                    {cat.feature && (
                      <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] font-bold text-[9px] rounded uppercase">
                        Feature
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Last Major Value Change */}
            <div className="p-3 bg-[#ffdad6]/20 border border-[#e4beba]/60 rounded-xl space-y-1">
              <p className="text-[10px] font-bold text-[#af101a] uppercase tracking-wider">
                Last Major Value Change
              </p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#5f5e5e]">Base Wholesale Price</span>
                <span className="font-mono font-bold text-[#1b1c1a]">
                  $310.00 → <span className="text-[#af101a]">${selectedProduct.details?.wholesalePrice || selectedProduct.price * 0.7}</span>
                </span>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2.5 bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#1b1c1a] font-bold text-xs rounded-lg border border-[#eae8e4] transition-colors">
                Compare Revision
              </button>
              <button className="flex-1 py-2.5 bg-[#af101a] hover:brightness-110 text-white font-bold text-xs rounded-lg shadow-sm transition-colors">
                Publish Updates
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#eae8e4] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#eae8e4] pb-3">
              <h3 className="font-geist text-lg font-bold text-[#1b1c1a]">Add New Product Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#5f5e5e] hover:text-[#af101a]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#5f5e5e] mb-1">SKU Identifier</label>
                <input
                  type="text"
                  required
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  placeholder="e.g. WCH-2026-X"
                  className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2.5 focus:outline-none focus:border-[#af101a] font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5f5e5e] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Zenith Chronograph Gold"
                  className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2.5 focus:outline-none focus:border-[#af101a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5f5e5e] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2.5 focus:outline-none focus:border-[#af101a]"
                  >
                    <option value="Wearables">Wearables</option>
                    <option value="Audio Gear">Audio Gear</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Office">Office</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5f5e5e] mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-[#f5f3ef] border border-[#e4beba] rounded-lg p-2.5 focus:outline-none focus:border-[#af101a] font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#eae8e4] rounded-lg font-bold text-[#5f5e5e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#af101a] text-white font-bold rounded-lg hover:brightness-110 shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
