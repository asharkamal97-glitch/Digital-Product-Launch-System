'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  Upload,
  AlertCircle,
  Filter,
} from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'CAMPUS',
    imageUrl: '',
    caption: '',
    isPublished: true,
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const categories = [
    { label: 'All Photos', val: 'ALL' },
    { label: 'Campus & Grounds', val: 'CAMPUS' },
    { label: 'Classrooms & Smart Labs', val: 'CLASSROOMS' },
    { label: 'Residential Hostels', val: 'HOSTEL' },
    { label: 'Sports & Athletics', val: 'SPORTS' },
    { label: 'Events & Functions', val: 'EVENTS' },
    { label: 'Facilities', val: 'FACILITIES' },
    { label: 'Other', val: 'OTHER' },
  ];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save gallery item');

      setMsg(`Photo "${formData.title}" added to gallery!`);
      setShowAddModal(false);
      setFormData({
        title: '',
        description: '',
        category: 'CAMPUS',
        imageUrl: '',
        caption: '',
        isPublished: true,
      });
      fetchGallery();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPublished: !currentStatus }),
      });
      fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
    try {
      await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered =
    selectedCategory === 'ALL'
      ? items
      : items.filter((i) => i.category === selectedCategory);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Gallery & Media Asset Manager</h1>
            <p className="text-xs text-slate-500">
              Manage categorized school photography, campus life albums, and website media assets.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-2 shadow"
          >
            <Plus className="w-3.5 h-3.5 text-gold-400" />
            Add Photo to Gallery
          </button>
        </div>

        {msg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{msg}</span>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.val}
              onClick={() => setSelectedCategory(c.val)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === c.val
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-12 text-center text-slate-500 text-sm">
              Loading gallery media...
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-48 bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brand-900/90 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {item.category}
                  </span>
                  <span
                    className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.isPublished ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-white'
                    }`}
                  >
                    {item.isPublished ? 'Published' : 'Hidden'}
                  </span>
                </div>

                <div className="p-5 space-y-2 text-xs">
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed truncate">{item.caption || item.description}</p>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleTogglePublish(item.id, item.isPublished)}
                    className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
                      item.isPublished
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {item.isPublished ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{item.isPublished ? 'Unpublish' : 'Publish'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
              No photos found in this category.
            </div>
          )}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 animate-fade-in my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-brand-950">Add Photo to Gallery</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Photo Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Science Laboratory Practicals"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    <option value="CAMPUS">Campus & Grounds</option>
                    <option value="CLASSROOMS">Classrooms & Smart Labs</option>
                    <option value="HOSTEL">Residential Hostels</option>
                    <option value="SPORTS">Sports & Athletics</option>
                    <option value="EVENTS">Events & Functions</option>
                    <option value="FACILITIES">Facilities</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Image URL / Asset Path *</label>
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/... or /uploads/..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Caption / Description</label>
                  <textarea
                    rows={3}
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    placeholder="Enter short description..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                  <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-brand-900 text-white font-bold shadow">
                    {saving ? 'Saving...' : 'Add to Gallery'}
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
