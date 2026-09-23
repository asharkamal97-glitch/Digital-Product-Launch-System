'use client';

import React, { useState, useEffect } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import {
  CalendarCheck,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Plus,
  Users,
  Clock,
  Send,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'homework' | 'marks'>('attendance');
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, string>>({});
  const [savingAttendance, setSavingAttendance] = useState(false);
  const [attendanceMsg, setAttendanceMsg] = useState<string | null>(null);

  // Homework State
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDueDate, setHwDueDate] = useState('2026-09-05');
  const [savingHw, setSavingHw] = useState(false);
  const [hwMsg, setHwMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/students')
      .then((res) => res.json())
      .then((data) => {
        if (data.classes && data.classes.length > 0) {
          setClasses(data.classes);
          setSelectedClassId(data.classes[0].id);
          setSelectedSectionId(data.classes[0].sections?.[0]?.id || '');
        }
      });
  }, []);

  const loadClassStudents = async () => {
    if (!selectedClassId || !selectedSectionId) return;
    try {
      const res = await fetch(`/api/teacher/attendance?classId=${selectedClassId}&sectionId=${selectedSectionId}&date=${attendanceDate}`);
      const data = await res.json();
      if (data.students) {
        setStudents(data.students);
        const map: Record<string, string> = {};
        data.students.forEach((st: any) => {
          map[st.id] = st.attendances?.[0]?.status || 'PRESENT';
        });
        setAttendanceRecords(map);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadHomeworks = async () => {
    try {
      const res = await fetch(`/api/teacher/homework?classId=${selectedClassId}&sectionId=${selectedSectionId}`);
      const data = await res.json();
      if (data.homeworks) setHomeworks(data.homeworks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadClassStudents();
    loadHomeworks();
  }, [selectedClassId, selectedSectionId, attendanceDate]);

  const handleSaveAttendance = async () => {
    setSavingAttendance(true);
    setAttendanceMsg(null);
    try {
      const records = Object.entries(attendanceRecords).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      const res = await fetch('/api/teacher/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId: selectedClassId,
          sectionId: selectedSectionId,
          date: attendanceDate,
          records,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setAttendanceMsg('Daily class attendance recorded successfully!');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingAttendance(false);
    }
  };

  const handleCreateHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHw(true);
    setHwMsg(null);

    const cls = classes.find((c) => c.id === selectedClassId);
    const sub = cls?.subjects?.[0] || { id: 'default_subject' };

    try {
      const res = await fetch('/api/teacher/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: hwTitle,
          description: hwDesc,
          classId: selectedClassId,
          sectionId: selectedSectionId,
          subjectId: sub.id,
          dueDate: hwDueDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create');

      setHwMsg(`Assignment "${hwTitle}" published to class!`);
      setHwTitle('');
      setHwDesc('');
      loadHomeworks();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingHw(false);
    }
  };

  return (
    <PortalLayout role="TEACHER">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                Faculty Workspace
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 mt-1">
              Teacher Instruction Portal
            </h1>
            <p className="text-xs text-slate-500">
              Manage daily class attendance, assign homework tasks, and evaluate student marks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'attendance' ? 'bg-brand-900 text-white shadow' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Mark Attendance
            </button>
            <button
              onClick={() => setActiveTab('homework')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'homework' ? 'bg-brand-900 text-white shadow' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Assignments
            </button>
          </div>
        </div>

        {/* TAB 1: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => {
                      const cls = classes.find((c) => c.id === e.target.value);
                      setSelectedClassId(e.target.value);
                      setSelectedSectionId(cls?.sections?.[0]?.id || '');
                    }}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Section</label>
                  <select
                    value={selectedSectionId}
                    onChange={(e) => setSelectedSectionId(e.target.value)}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    {classes.find((c) => c.id === selectedClassId)?.sections?.map((s: any) => (
                      <option key={s.id} value={s.id}>Section {s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveAttendance}
                disabled={savingAttendance}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all disabled:opacity-50"
              >
                {savingAttendance ? 'Saving...' : 'Save Class Attendance'}
              </button>
            </div>

            {attendanceMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{attendanceMsg}</span>
              </div>
            )}

            {/* Attendance Roster */}
            <div className="divide-y divide-slate-100">
              {students.map((st) => {
                const currentStatus = attendanceRecords[st.id] || 'PRESENT';
                return (
                  <div key={st.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-brand-900 font-bold font-mono flex items-center justify-center text-xs">
                        {st.rollNo}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{st.firstName} {st.lastName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{st.admissionNo}</p>
                      </div>
                    </div>

                    {/* Status Pill Switcher */}
                    <div className="flex items-center gap-1.5">
                      {['PRESENT', 'ABSENT', 'LATE', 'LEAVE'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setAttendanceRecords((prev) => ({ ...prev, [st.id]: status }))}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                            currentStatus === status
                              ? status === 'PRESENT'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : status === 'ABSENT'
                                ? 'bg-red-600 text-white shadow-sm'
                                : status === 'LATE'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'bg-blue-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: HOMEWORK & ASSIGNMENTS */}
        {activeTab === 'homework' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Create Homework Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-brand-950">Assign Class Homework</h3>

              {hwMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{hwMsg}</span>
                </div>
              )}

              <form onSubmit={handleCreateHomework} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Assignment Title *</label>
                  <input
                    type="text"
                    required
                    value={hwTitle}
                    onChange={(e) => setHwTitle(e.target.value)}
                    placeholder="e.g. Chapter 4 Geometry Practice Problems"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Submission Due Date *</label>
                  <input
                    type="date"
                    required
                    value={hwDueDate}
                    onChange={(e) => setHwDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Instructions & Problem Numbers *</label>
                  <textarea
                    rows={4}
                    required
                    value={hwDesc}
                    onChange={(e) => setHwDesc(e.target.value)}
                    placeholder="Complete exercises 4.1 to 4.3 in notebook..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingHw}
                  className="w-full py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-gold-400" />
                  <span>{savingHw ? 'Publishing...' : 'Assign to Class'}</span>
                </button>
              </form>
            </div>

            {/* Existing Homework List */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-brand-950">Active Class Assignments</h3>

              <div className="divide-y divide-slate-100 text-xs">
                {homeworks.map((hw) => (
                  <div key={hw.id} className="py-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{hw.title}</h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Due: {formatDate(hw.dueDate)}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{hw.description}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Class: {hw.class.name} - {hw.section.name} | Assigned on {formatDate(hw.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
