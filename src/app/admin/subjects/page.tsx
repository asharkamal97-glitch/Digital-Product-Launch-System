'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  classId: string;
  class?: {
    id: string;
    name: string;
  };
}

interface ClassModel {
  id: string;
  name: string;
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT'>('ADD');
  const [currentSubject, setCurrentSubject] = useState<Partial<Subject>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, [selectedClassFilter]);

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/admin/classes');
      if (res.ok) {
        const data = await res.json();
        setClasses(data.classes || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const url = selectedClassFilter !== 'ALL' 
        ? `/api/admin/subjects?classId=${selectedClassFilter}` 
        : '/api/admin/subjects';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setSubjects(data.subjects || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setModalMode('ADD');
    setCurrentSubject({ name: '', code: '', classId: classes.length > 0 ? classes[0].id : '' });
    setIsModalOpen(true);
  };

  const openEditModal = (subject: Subject) => {
    setModalMode('EDIT');
    setCurrentSubject(subject);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setError('');
    if (!currentSubject.name || !currentSubject.code || !currentSubject.classId) {
      setError('Please fill all fields');
      return;
    }
    try {
      const url = modalMode === 'ADD' ? '/api/admin/subjects' : `/api/admin/subjects/${currentSubject.id}`;
      const method = modalMode === 'ADD' ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSubject)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchSubjects();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save subject');
      }
    } catch (e) {
      setError('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subject?')) return;
    try {
      const res = await fetch(`/api/admin/subjects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSubjects();
      } else {
        alert('Failed to delete subject');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-brand-950">Manage Subjects</h1>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            <Plus size={18} /> Add Subject
          </button>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Class</label>
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-950"
            >
              <option value="ALL">All Classes</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.length > 0 ? (
                  subjects.map((sub) => (
                    <tr key={sub.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.class?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => openEditModal(sub)} className="text-brand-950 hover:text-brand-800 mr-4">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(sub.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No subjects found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">{modalMode === 'ADD' ? 'Add Subject' : 'Edit Subject'}</h2>
            
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
                <input
                  type="text"
                  value={currentSubject.code || ''}
                  onChange={(e) => setCurrentSubject({...currentSubject, code: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-950"
                  placeholder="e.g. MAT101"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  value={currentSubject.name || ''}
                  onChange={(e) => setCurrentSubject({...currentSubject, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-950"
                  placeholder="e.g. Mathematics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={currentSubject.classId || ''}
                  onChange={(e) => setCurrentSubject({...currentSubject, classId: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-950"
                >
                  <option value="">Select a Class</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-brand-950 text-white rounded-md hover:bg-brand-800">
                {modalMode === 'ADD' ? 'Create' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
