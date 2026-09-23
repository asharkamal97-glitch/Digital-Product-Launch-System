import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Award,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Download,
} from 'lucide-react';

export const metadata = {
  title: 'Academics & Curriculum | Shabab Ashraf Residential School',
  description:
    'Explore the academic structure, CBSE curriculum framework, examination system, calendar, and study methodology from Nursery to Class 10 at SARS Siwan.',
};

export default function AcademicsPage() {
  const classTiers = [
    {
      title: 'Foundational Stage (Nursery, LKG, UKG)',
      age: 'Ages 3 - 6 Years',
      description:
        'Play-based and activity-driven learning focusing on early literacy, phonics, numbers, sensory development, art, and motor skills.',
      subjects: ['English Rhymes & Phonics', 'Hindi Balgeet', 'Number Concepts', 'Art & Craft', 'General Environmental Awareness'],
    },
    {
      title: 'Primary Stage (Classes 1 to 5)',
      age: 'Ages 6 - 11 Years',
      description:
        'Building strong foundational competence in languages, mathematics, environmental studies, moral education, and computer basics.',
      subjects: ['English Language & Literature', 'Mathematics', 'EVS & General Science', 'Hindi & Vyakaran', 'Computer Foundations', 'Moral Values & GK'],
    },
    {
      title: 'Middle Stage (Classes 6 to 8)',
      age: 'Ages 11 - 14 Years',
      description:
        'Transition to specialized disciplines with intensive laboratory experiments, scientific reasoning, history, geography, and coding projects.',
      subjects: ['Mathematics (Algebra & Geometry)', 'General Science (Physics, Chem, Bio)', 'Social Science (History, Civics, Geography)', 'English & Hindi', 'Computer Applications & Coding', 'Sanskrit/Urdu'],
    },
    {
      title: 'Secondary Stage (Classes 9 & 10)',
      age: 'Ages 14 - 16 Years',
      description:
        'Rigorous CBSE pattern preparation focusing on board examination excellence, deep concept mastery, analytical problem-solving, and continuous mock tests.',
      subjects: ['Advanced Mathematics', 'Integrated Science with Practicals', 'Social Science', 'English Communicative', 'Hindi Course-A', 'Information Technology (IT 402)'],
    },
  ];

  const calendarItems = [
    { month: 'April 2026', event: 'Commencement of Academic Session 2026-27 & Orientation' },
    { month: 'July 2026', event: 'Unit Test 1 / Formative Assessments' },
    { month: 'September 2026', event: 'Mid-Term / Half-Yearly Examinations' },
    { month: 'October 2026', event: 'Science, Robotics & Art Exhibition' },
    { month: 'November 2026', event: 'Annual Athletics Meet & Sports Championship' },
    { month: 'December 2026', event: 'Unit Test 2 & Pre-Board Evaluations' },
    { month: 'February - March 2027', event: 'Annual Final Examinations & Board Assessments' },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        {/* Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              CBSE Pattern • Holistic Excellence
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Academic Structure & Curriculum
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Empowering students through conceptual understanding, experiential science labs, smart classrooms, and personalized academic mentoring.
            </p>
          </div>
        </div>

        {/* Academic Stages */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              Classes & Stages
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-950">
              Structured Educational Stages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                      {tier.age}
                    </span>
                    <GraduationCap className="w-5 h-5 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{tier.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Subjects:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href="/admissions"
                    className="font-bold text-brand-900 hover:text-brand-700 inline-flex items-center gap-1"
                  >
                    Apply for this Stage
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Calendar & Evaluation */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Side: Examination System */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                    Evaluation System
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                    Continuous & Comprehensive Assessment
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    SARS implements a balanced assessment system that evaluates both scholastic achievements and co-scholastic growth.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="font-bold text-brand-900">1. Formative Assessments & Periodic Tests</h4>
                    <p className="text-slate-600 text-xs">Regular weekly class tests, homework assignments, and laboratory practical assessments.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="font-bold text-brand-900">2. Terminal & Mid-Term Examinations</h4>
                    <p className="text-slate-600 text-xs">Comprehensive written examinations at the end of Term 1 (September) with detailed report cards.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="font-bold text-brand-900">3. Annual Board & Final Examinations</h4>
                    <p className="text-slate-600 text-xs">Final comprehensive evaluation covering the full syllabus with standardized CBSE grading criteria.</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Academic Calendar Highlights */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Session 2026-2027
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                    Annual Academic Calendar
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    Key milestones, assessment windows, and events throughout the academic year.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {calendarItems.map((cal, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs"
                    >
                      <span className="font-bold text-brand-900 shrink-0 w-28">{cal.month}</span>
                      <span className="text-slate-700 font-medium text-right">{cal.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
