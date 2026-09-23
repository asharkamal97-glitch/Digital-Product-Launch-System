'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AcademicYear {
  id: string;
  name: string;
  status: string;
}

interface ClassModel {
  id: string;
  name: string;
}

interface SectionModel {
  id: string;
  name: string;
}

interface Student {
  id: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
}

export default function PromotionPage() {
  const [step, setStep] = useState(1);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const [sections, setSections] = useState<SectionModel[]>([]);
  
  // Step 1 states
  const [sourceYear, setSourceYear] = useState('');
  const [sourceClass, setSourceClass] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  
  // Step 2 states
  const [targetYear, setTargetYear] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [targetSection, setTargetSection] = useState('');
  
  // Result
  const [isPromoting, setIsPromoting] = useState(false);
  const [promotedCount, setPromotedCount] = useState(0);

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    if (sourceYear && sourceClass) {
      fetchStudents();
    }
  }, [sourceYear, sourceClass]);

  useEffect(() => {
    if (targetClass) {
      fetchSections(targetClass);
    }
  }, [targetClass]);

  const fetchInitData = async () => {
    try {
      const [ayRes, clsRes] = await Promise.all([
        fetch('/api/admin/academic-years'),
        fetch('/api/admin/classes')
      ]);
      if (ayRes.ok) {
        const ayData = await ayRes.json();
        setAcademicYears(ayData.academicYears || []);
      }
      if (clsRes.ok) {
        const clsData = await clsRes.json();
        setClasses(clsData.classes || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSections = async (classId: string) => {
    try {
      const res = await fetch(`/api/admin/sections?classId=${classId}`);
      if (res.ok) {
        const data = await res.json();
        setSections(data.sections || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await fetch(`/api/admin/students?academicYearId=${sourceYear}&classId=${sourceClass}`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
        setSelectedStudents((data.students || []).map((s: Student) => s.id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, id]);
    } else {
      setSelectedStudents(selectedStudents.filter(sId => sId !== id));
    }
  };

  const handlePromote = async () => {
    if (!targetYear || !targetClass || !targetSection) {
      alert('Please select all target details.');
      return;
    }
    setIsPromoting(true);
    try {
      const res = await fetch('/api/admin/students/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentIds: selectedStudents,
          targetAcademicYearId: targetYear,
          targetClassId: targetClass,
          targetSectionId: targetSection
        })
      });
      const data = await res.json();
      if (res.ok) {
        setPromotedCount(selectedStudents.length);
        setStep(3);
      } else {
        alert(data.error || 'Failed to promote students');
      }
    } catch (e) {
      alert('An error occurred');
    } finally {
      setIsPromoting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-brand-950 mb-6">Student Promotion</h1>
        
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Step 1: Select Source</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Academic Year</label>
                <select value={sourceYear} onChange={e => setSourceYear(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="">Select Academic Year</option>
                  {academicYears.map(ay => <option key={ay.id} value={ay.id}>{ay.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Class</label>
                <select value={sourceClass} onChange={e => setSourceClass(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="">Select Class</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {sourceYear && sourceClass && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-3 flex items-center justify-between">
                  <span>Student Roster</span>
                  <span className="text-sm font-normal text-gray-500">{selectedStudents.length} selected</span>
                </h3>
                {loadingStudents ? (
                  <p>Loading...</p>
                ) : (
                  <div className="border rounded-md max-h-96 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left">
                            <input 
                              type="checkbox" 
                              checked={selectedStudents.length === students.length && students.length > 0}
                              onChange={(e) => handleSelectAll(e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admission No</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map(student => (
                          <tr key={student.id}>
                            <td className="px-6 py-4">
                              <input 
                                type="checkbox"
                                checked={selectedStudents.includes(student.id)}
                                onChange={(e) => handleSelectStudent(student.id, e.target.checked)}
                                className="rounded border-gray-300"
                              />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{student.admissionNo}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{student.firstName} {student.lastName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setStep(2)}
                    disabled={selectedStudents.length === 0}
                    className="flex items-center gap-2 px-6 py-2 bg-brand-950 text-white rounded-md hover:bg-brand-800 disabled:opacity-50"
                  >
                    Next Step <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Step 2: Select Destination</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">You are about to promote <strong>{selectedStudents.length}</strong> students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Academic Year</label>
                <select value={targetYear} onChange={e => setTargetYear(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="">Select Target Year</option>
                  {academicYears.map(ay => <option key={ay.id} value={ay.id}>{ay.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Class</label>
                <select value={targetClass} onChange={e => setTargetClass(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="">Select Target Class</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Section</label>
                <select value={targetSection} onChange={e => setTargetSection(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="">Select Section</option>
                  {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Back
              </button>
              <button 
                onClick={handlePromote}
                disabled={isPromoting || !targetYear || !targetClass || !targetSection}
                className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
              >
                {isPromoting ? 'Promoting...' : 'Promote Selected Students'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 size={64} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Promotion Successful!</h2>
            <p className="text-gray-600 mb-8">Successfully promoted {promotedCount} students to their new class. Their previous academic records have been preserved.</p>
            <button 
              onClick={() => { setStep(1); setSourceYear(''); setSourceClass(''); setSelectedStudents([]); }}
              className="px-6 py-2 bg-brand-950 text-white rounded-md hover:bg-brand-800"
            >
              Start New Promotion
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
