import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeeLookupForm from '@/components/fees/FeeLookupForm';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  Receipt,
  HelpCircle,
  Sparkles,
  Lock,
} from 'lucide-react';

export const metadata = {
  title: 'Pay School Fees Online | Shabab Ashraf Residential School',
  description:
    'Secure online school and hostel fee payment portal for Shabab Ashraf Residential School (SARS) Siwan. Instant verification and downloadable official PDF receipt.',
};

export default function PayFeesPage() {
  const paymentFaqs = [
    {
      q: 'Which payment methods are supported?',
      a: 'We support all major payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Debit & Credit Cards (Visa, MasterCard, RuPay), and Net Banking across 50+ Indian banks via secured gateway.',
    },
    {
      q: 'Will I receive an official receipt immediately?',
      a: 'Yes! As soon as the transaction is confirmed, an official electronic receipt with a unique serial number and digital QR verification code is generated for instant printing or PDF download.',
    },
    {
      q: 'Can I pay quarterly or itemized fees?',
      a: 'Yes, our system allows parents to select specific quarterly composite fees (Tuition, Smart Class, Hostel, Exam) or clear the full outstanding amount in a single transaction.',
    },
    {
      q: 'Is my transaction secure?',
      a: 'Absolutely. All payments are encrypted using 256-bit SSL protocols. SARS does not store any sensitive card numbers, CVVs, or UPI PINs.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        {/* Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Lock className="w-3.5 h-3.5" />
              100% Encrypted & Instant Official Receipt
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Online Fee Payment Portal
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Fast, seamless, and transparent fee payment for students and parents of Shabab Ashraf Residential School.
            </p>
          </div>
        </div>

        {/* Main Payment Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900">Instant Clearance</p>
                <p className="text-slate-500">Real-time ledger update</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-50 text-brand-900">
                <Receipt className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900">Official PDF Receipt</p>
                <p className="text-slate-500">Generated automatically</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900">QR Authenticity</p>
                <p className="text-slate-500">Tamper-proof digital seal</p>
              </div>
            </div>
          </div>

          {/* Interactive Fee Lookup & Payment Widget */}
          <FeeLookupForm />

          {/* Payment FAQ Section */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-brand-900 font-bold text-lg">
              <HelpCircle className="w-5 h-5 text-gold-500" />
              <h3>Frequently Asked Questions on Online Fee Payment</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {paymentFaqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-brand-950">{faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
