'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  DollarSign, Plus, Edit, Trash2, Copy, Check, X, 
  RefreshCw, ChevronDown, MoreVertical, Search, Filter, 
  AlertTriangle, Loader2, ToggleLeft, ToggleRight, Calendar
} from 'lucide-react';

type AcademicYear = { id: string; name: string };
type ClassInfo = { id: string; name: string; numericLevel?: number };
type FeeCategory = { id: string; name: string; code: string };

type Frequency = 'ONE_TIME' | 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'ANNUALLY';

type FeeStructureItem = {
  id?: string;
  feeCategoryId: string;
  feeCategory?: { id: string; name: string; code: string };
  amount: number;
  frequency: Frequency;
  isOptional: boolean;
  dueDate?: string;
  description?: string;
};

type FeeStructure = {
  id: string;
  name: string;
  academicYear: AcademicYear;
  academicYearId?: string;
  class: ClassInfo;
  classId?: string;
  totalYearly: number;
  isActive: boolean;
  version: number;
  effectiveDate: string | null;
  items: FeeStructureItem[];
  createdAt: string;
  updatedAt: string;
};

const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0 
  }).format(amount);
};

const calculateAnnualAmount = (amount: number, frequency: Frequency): number => {
  switch (frequency) {
    case 'MONTHLY': return amount * 12;
    case 'QUARTERLY': return amount * 4;
    case 'HALF_YEARLY': return amount * 2;
    case 'ANNUALLY': return amount * 1;
    case 'ONE_TIME': return amount * 1;
    default: return amount;
  }
};

export default function FeeStructurePage() {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    academicYearId: '',
    classId: '',
    status: 'all' as 'all' | 'active' | 'inactive'
  });
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Selected items for actions
  const [currentStructure, setCurrentStructure] = useState<FeeStructure | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    academicYearId: '',
    classId: '',
    effectiveDate: '',
    items: [] as FeeStructureItem[]
  });
  
  // Duplicate Form State
  const [duplicateData, setDuplicateData] = useState({
    targetAcademicYearId: '',
    targetClassId: '',
    newName: ''
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchStructures = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
      if (filters.classId) params.append('classId', filters.classId);
      params.append('status', filters.status);

      const res = await fetch(`/api/admin/fees/structure?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      
      const data = await res.json();
      setFeeStructures(data.feeStructures || []);
      
      // Update metadata if present
      if (data.classes) setClasses(data.classes);
      if (data.academicYears) setAcademicYears(data.academicYears);
      if (data.feeCategories) setFeeCategories(data.feeCategories);
    } catch (err: any) {
      showToast(err.message || 'Failed to load fee structures', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchStructures();
  }, [fetchStructures]);

  // Form Handlers
  const handleOpenCreateModal = () => {
    setCurrentStructure(null);
    setFormData({
      name: '',
      academicYearId: academicYears[0]?.id || '',
      classId: classes[0]?.id || '',
      effectiveDate: new Date().toISOString().split('T')[0],
      items: []
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (structure: FeeStructure) => {
    setCurrentStructure(structure);
    setFormData({
      name: structure.name,
      academicYearId: structure.academicYear.id,
      classId: structure.class.id,
      effectiveDate: structure.effectiveDate ? new Date(structure.effectiveDate).toISOString().split('T')[0] : '',
      items: structure.items.map(item => ({
        id: item.id,
        feeCategoryId: item.feeCategoryId,
        amount: item.amount,
        frequency: item.frequency,
        isOptional: item.isOptional,
        dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : '',
        description: item.description || ''
      }))
    });
    setIsFormModalOpen(true);
  };

  const addFeeItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          feeCategoryId: feeCategories[0]?.id || '',
          amount: 0,
          frequency: 'MONTHLY' as Frequency,
          isOptional: false,
        }
      ]
    }));
  };

  const removeFeeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateFeeItem = (index: number, field: keyof FeeStructureItem, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleSaveStructure = async () => {
    if (!formData.name || !formData.academicYearId || !formData.classId) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    if (formData.items.length === 0) {
      showToast('Please add at least one fee head', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const url = '/api/admin/fees/structure';
      const method = currentStructure ? 'PUT' : 'POST';
      const body = currentStructure 
        ? { id: currentStructure.id, ...formData }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save fee structure');
      }

      showToast(`Fee structure ${currentStructure ? 'updated' : 'created'} successfully`, 'success');
      setIsFormModalOpen(false);
      fetchStructures();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/fees/structure/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      showToast(`Structure ${isActive ? 'activated' : 'deactivated'}`, 'success');
      fetchStructures();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async () => {
    if (!currentStructure) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/fees/structure', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentStructure.id })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete fee structure');
      }

      showToast('Fee structure deleted successfully', 'success');
      setIsDeleteModalOpen(false);
      fetchStructures();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDuplicate = async () => {
    if (!currentStructure || !duplicateData.targetAcademicYearId || !duplicateData.targetClassId || !duplicateData.newName) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/fees/structure/${currentStructure.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicateData)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to duplicate fee structure');
      }

      showToast('Fee structure duplicated successfully', 'success');
      setIsDuplicateModalOpen(false);
      fetchStructures();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const calculateTotal = (items: FeeStructureItem[]) => {
    return items.reduce((sum, item) => {
      if (item.isOptional) return sum;
      return sum + calculateAnnualAmount(item.amount, item.frequency);
    }, 0);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2 ${
            toast.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
          }`}>
            {toast.type === 'success' ? <Check className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-red-600" />}
            <span className="font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-auto text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-950 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-gold-500" />
              Fee Structure Management
            </h1>
            <p className="text-slate-500 mt-1">Configure and manage class-wise fee structures</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => fetchStructures()}
              className="p-2.5 text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={handleOpenCreateModal}
              className="px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-xl shadow-sm flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Fee Structure
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Academic Year</label>
            <select 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-slate-50/50"
              value={filters.academicYearId}
              onChange={(e) => setFilters(prev => ({ ...prev, academicYearId: e.target.value }))}
            >
              <option value="">All Academic Years</option>
              {academicYears.map(ay => (
                <option key={ay.id} value={ay.id}>{ay.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Class</label>
            <select 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-slate-50/50"
              value={filters.classId}
              onChange={(e) => setFilters(prev => ({ ...prev, classId: e.target.value }))}
            >
              <option value="">All Classes</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
            <select 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-slate-50/50"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-600 font-medium">
                <tr>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Structure Name</th>
                  <th className="px-6 py-4">Academic Year</th>
                  <th className="px-6 py-4">Total Annual Fee</th>
                  <th className="px-6 py-4">Fee Heads</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-gold-500" />
                      Loading fee structures...
                    </td>
                  </tr>
                ) : feeStructures.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <DollarSign className="w-12 h-12 text-slate-300 mb-3" />
                        <p className="text-base font-medium text-slate-700">No fee structures found</p>
                        <p className="text-sm mt-1">Try adjusting filters or create a new one.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  feeStructures.map((structure) => (
                    <tr key={structure.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-brand-950">{structure.class?.name}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{structure.name}</div>
                        {structure.version > 1 && <div className="text-xs text-slate-500 mt-0.5">v{structure.version}</div>}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{structure.academicYear?.name}</td>
                      <td className="px-6 py-4 font-semibold text-emerald-700">
                        {formatINR(structure.totalYearly)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {structure.items?.length || 0} items
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          structure.isActive 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {structure.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleOpenEditModal(structure)}
                            className="p-1.5 text-slate-500 hover:text-brand-950 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentStructure(structure);
                              setDuplicateData({
                                targetAcademicYearId: structure.academicYearId || '',
                                targetClassId: structure.classId || '',
                                newName: `${structure.name} (Copy)`
                              });
                              setIsDuplicateModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-brand-950 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleStatus(structure.id, !structure.isActive)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              structure.isActive ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                            }`}
                            title={structure.isActive ? "Deactivate" : "Activate"}
                          >
                            {structure.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentStructure(structure);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal (Slide-over / Large Modal) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-bold text-brand-950 flex items-center gap-2">
                {currentStructure ? <Edit className="w-5 h-5 text-gold-500" /> : <Plus className="w-5 h-5 text-gold-500" />}
                {currentStructure ? 'Edit Fee Structure' : 'Create Fee Structure'}
              </h2>
              <button 
                onClick={() => setIsFormModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Structure Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    placeholder="e.g. Class 10 Standard Fee 2024"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Effective Date (Optional)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      value={formData.effectiveDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Academic Year *</label>
                  <select
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    value={formData.academicYearId}
                    onChange={(e) => setFormData(prev => ({ ...prev, academicYearId: e.target.value }))}
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map(ay => (
                      <option key={ay.id} value={ay.id}>{ay.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Class *</label>
                  <select
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    value={formData.classId}
                    onChange={(e) => setFormData(prev => ({ ...prev, classId: e.target.value }))}
                  >
                    <option value="">Select Class</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-brand-950">Fee Heads</h3>
                  <button 
                    type="button"
                    onClick={addFeeItem}
                    className="px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Head
                  </button>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
                      <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                        <tr>
                          <th className="px-4 py-3">Fee Category</th>
                          <th className="px-4 py-3">Amount (₹)</th>
                          <th className="px-4 py-3">Frequency</th>
                          <th className="px-4 py-3 text-center">Optional</th>
                          <th className="px-4 py-3">Description</th>
                          <th className="px-4 py-3 text-center w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {formData.items.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                              No fee heads added. Click "Add Head" to begin.
                            </td>
                          </tr>
                        ) : (
                          formData.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2">
                                <select 
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                                  value={item.feeCategoryId}
                                  onChange={(e) => updateFeeItem(index, 'feeCategoryId', e.target.value)}
                                >
                                  {feeCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                                  value={item.amount}
                                  onChange={(e) => updateFeeItem(index, 'amount', parseFloat(e.target.value) || 0)}
                                />
                              </td>
                              <td className="px-4 py-2">
                                <select 
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                                  value={item.frequency}
                                  onChange={(e) => updateFeeItem(index, 'frequency', e.target.value)}
                                >
                                  <option value="ONE_TIME">One Time</option>
                                  <option value="MONTHLY">Monthly</option>
                                  <option value="QUARTERLY">Quarterly</option>
                                  <option value="HALF_YEARLY">Half Yearly</option>
                                  <option value="ANNUALLY">Annually</option>
                                </select>
                              </td>
                              <td className="px-4 py-2 text-center">
                                <input 
                                  type="checkbox"
                                  className="rounded border-slate-300 text-gold-500 focus:ring-gold-500 w-4 h-4"
                                  checked={item.isOptional}
                                  onChange={(e) => updateFeeItem(index, 'isOptional', e.target.checked)}
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input 
                                  type="text"
                                  placeholder="Optional remark"
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                                  value={item.description}
                                  onChange={(e) => updateFeeItem(index, 'description', e.target.value)}
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button 
                                  type="button"
                                  onClick={() => removeFeeItem(index)}
                                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      {formData.items.length > 0 && (
                        <tfoot className="bg-slate-50 border-t border-slate-200">
                          <tr>
                            <td colSpan={6} className="px-4 py-4 text-right">
                              <div className="flex justify-end items-center gap-4">
                                <span className="text-sm text-slate-500">Calculated Mandatory Annual Total:</span>
                                <span className="text-xl font-bold text-emerald-700">
                                  {formatINR(calculateTotal(formData.items))}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-200/50 font-medium rounded-xl transition-colors"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStructure}
                disabled={actionLoading}
                className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Fee Structure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Modal */}
      {isDuplicateModalOpen && currentStructure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                  <Copy className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-950">Duplicate Structure</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Academic Year *</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    value={duplicateData.targetAcademicYearId}
                    onChange={(e) => setDuplicateData(prev => ({ ...prev, targetAcademicYearId: e.target.value }))}
                  >
                    <option value="">Select Target Year</option>
                    {academicYears.map(ay => (
                      <option key={ay.id} value={ay.id}>{ay.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Class *</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    value={duplicateData.targetClassId}
                    onChange={(e) => setDuplicateData(prev => ({ ...prev, targetClassId: e.target.value }))}
                  >
                    <option value="">Select Target Class</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Structure Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    value={duplicateData.newName}
                    onChange={(e) => setDuplicateData(prev => ({ ...prev, newName: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsDuplicateModalOpen(false)}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDuplicate}
                  disabled={actionLoading}
                  className="px-6 py-2.5 bg-brand-950 hover:bg-brand-900 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && currentStructure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 text-red-500">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-950 mb-2">Delete Fee Structure?</h3>
              <p className="text-slate-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-700">{currentStructure.name}</span>? 
                This action will mark the structure as inactive. If students are assigned to this structure, deletion may be blocked.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-5 py-2.5 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="flex-1 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
