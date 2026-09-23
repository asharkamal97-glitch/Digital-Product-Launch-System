import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import { Award, BookOpen, Calendar, CheckCircle2, Trophy, Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminExaminationsPage() {
  const exams = await db.exam.findMany({
    include: {
      class: true,
      subjects: { include: { subject: true } },
      marks: {
        include: {
          student: { include: { class: true, section: true } },
          subject: true,
        },
      },
    },
    orderBy: { startDate: 'desc' },
  });

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Examination & Result Management</h1>
            <p className="text-xs text-slate-500">
              Schedule academic assessments, monitor grading curves, and publish terminal report cards.
            </p>
          </div>
          <span className="text-xs font-bold bg-gold-100 text-gold-900 px-3 py-1.5 rounded-xl border border-gold-300">
            Session 2026-2027
          </span>
        </div>

        {/* Exams List */}
        <div className="space-y-6">
          {exams.map((exam) => {
            const studentScores: Record<string, { student: any; totalMarks: number; maxTotal: number }> = {};
            exam.marks.forEach((m) => {
              if (!studentScores[m.studentId]) {
                studentScores[m.studentId] = {
                  student: m.student,
                  totalMarks: 0,
                  maxTotal: 0,
                };
              }
              studentScores[m.studentId].totalMarks += m.marksObtained;
              studentScores[m.studentId].maxTotal += 100;
            });

            const rankList = Object.values(studentScores).sort(
              (a, b) => b.totalMarks / b.maxTotal - a.totalMarks / a.maxTotal
            );

            return (
              <div key={exam.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                        {exam.term}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(exam.startDate)} – {formatDate(exam.endDate)}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-brand-950 mt-1">{exam.name}</h3>
                    <p className="text-xs text-slate-500">Class: <strong className="text-slate-800">{exam.class.name}</strong></p>
                  </div>

                  <span className="text-xs font-bold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
                    Results Published
                  </span>
                </div>

                {/* Exam Subjects Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Exam Subjects & Maximum Marks</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                    {exam.subjects.map((sub) => (
                      <div key={sub.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                        <p className="font-bold text-slate-800 truncate">{sub.subject.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">Max: {sub.maxMarks} | Pass: {sub.passMarks}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student Marks & Rankings */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    Top Performing Students & Report Cards
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                          <th className="py-2.5 px-4">Rank</th>
                          <th className="py-2.5 px-4">Student Particulars</th>
                          <th className="py-2.5 px-4">Class & Roll</th>
                          <th className="py-2.5 px-4">Total Score</th>
                          <th className="py-2.5 px-4">Percentage</th>
                          <th className="py-2.5 px-4 text-right">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {rankList.map((rank, idx) => {
                          const percentage = Math.round((rank.totalMarks / rank.maxTotal) * 100);
                          const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : 'B+';
                          return (
                            <tr key={rank.student.id} className="hover:bg-slate-50/80">
                              <td className="py-2.5 px-4 font-bold text-brand-900">
                                {idx === 0 ? '🥇 1st' : idx === 1 ? '🥈 2nd' : `${idx + 1}th`}
                              </td>
                              <td className="py-2.5 px-4 font-bold text-slate-900">
                                {rank.student.firstName} {rank.student.lastName}
                                <span className="block text-[10px] text-slate-400 font-mono">{rank.student.admissionNo}</span>
                              </td>
                              <td className="py-2.5 px-4 font-semibold text-slate-700">
                                {rank.student.class.name} - {rank.student.section.name} (Roll: {rank.student.rollNo})
                              </td>
                              <td className="py-2.5 px-4 font-bold text-slate-900">
                                {rank.totalMarks} / {rank.maxTotal}
                              </td>
                              <td className="py-2.5 px-4 font-extrabold text-emerald-700">
                                {percentage}%
                              </td>
                              <td className="py-2.5 px-4 text-right">
                                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                  {grade}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
