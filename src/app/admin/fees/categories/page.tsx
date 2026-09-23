'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Layers,
  Search,
  RefreshCw,
  X,
  AlertCircle,
  FolderTree,
} from 'lucide-react';

interface FeeCategory {
  id: string;
  name: string;
  code: string;
  description: string | null;
  isDefault: boolean;
  createdAt: string;
  _count: {
    feeStructureItems: number;
    studentFeeItems: number;
  };
}

export default function FeeCategoriesPage() {
  const [categories, setCategories] = useState<FeeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FeeCategory | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/fees/categories');
      const data = await res.json();
      if (res.ok) {
        setCategories(data.categories || []);
      } else {
        setError(data.error || 'Failed to load fee categories');
      }
    } catch (err: any) {
      setError('Network error while fetching fee categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', code: '', description: '' });
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (cat: FeeCategory) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      code: cat.code,
      description: cat.description || '',
    });
    setError(null);
    setModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!editingCategory) {
      // Auto-suggest code
      const autoCode = val
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, '')
        .replace(/\s+/g, '_');
      setFormData({ ...formData, name: val, code: autoCode });
    } else {
      setFormData({ ...formData, name: val });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const url = '/api/admin/fees/categories';
      const method = editingCategory ? 'PUT' : 'POST';
      const body = editingCategory
        ? { id: editingCategory.id, ...formData }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save fee category');
      }

      setSuccessMsg(
        editingCategory
          ? `Updated category "${formData.name}" successfully`
          : `Created new fee category "${formData.name}"`
      );
      setTimeout(() => setSuccessMsg(null), 4000);
      setModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat: FeeCategory) => {
    if (
      !confirm(
        `Are you sure you want to delete the fee head "${cat.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/fees/categories?id=${cat.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to delete fee category');
        return;
      }

      setSuccessMsg(`Deleted category "${cat.name}" successfully`);
      setTimeout(() => setSuccessMsg(null), 4000);
      fetchCategories();
    } catch (err: any) {
      alert('Network error while deleting category');
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Institutional Finance Master
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-950 mt-1">
              Fee Heads & Categories
            </h1>
            <p className="text-xs text-slate-500">
              Define standard and custom ledger heads (Tuition, Hostel, Transport, Lab, Computer, Exam, etc.) used across class fee structures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchCategories}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-2xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all scale-[1.01] hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Fee Head</span>
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search category name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium"
            />
          </div>

          <div className="text-slate-500 font-medium">
            Showing <strong>{filteredCategories.length}</strong> of <strong>{categories.length}</strong> categories
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-xs text-slate-400">
            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading Fee Categories...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono text-[10px] font-bold text-slate-700">
                      {cat.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-brand-950">{cat.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {cat.description || 'Standard institutional fee component.'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Usage</span>
                    <span className="font-bold text-slate-700">
                      {cat._count.feeStructureItems} Structures · {cat._count.studentFeeItems} Ledgers
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(cat)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title={
                        cat._count.feeStructureItems > 0 || cat._count.studentFeeItems > 0
                          ? 'Cannot delete assigned fee head'
                          : 'Delete Fee Category'
                      }
                      disabled={cat._count.feeStructureItems > 0 || cat._count.studentFeeItems > 0}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-brand-950 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-gold-600" />
                  </div>
                  <h3 className="font-extrabold text-base text-brand-950">
                    {editingCategory ? 'Edit Fee Category' : 'Create New Fee Head'}
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Science Laboratory Fee"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Category Code * <span className="text-slate-400 font-normal">(UPPERCASE identifier)</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SCIENCE_LAB"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-gold-500 font-bold text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Description / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Optional description of what this fee covers..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-extrabold shadow-md transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
