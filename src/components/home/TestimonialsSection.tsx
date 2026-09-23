import React from 'react';
import { Star, Quote, HeartHandshake } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Mohammad Tariq Anwar',
      role: 'Parent of Class 8 & 5 Students',
      location: 'Siwan Town',
      content:
        'Enrolling my children at Shabab Ashraf Residential School was the best decision for their education. The residential environment instills discipline and self-study habits, while the faculty gives individual attention to each child.',
      rating: 5,
    },
    {
      name: 'Dr. Manoj Mishra',
      role: 'Parent of Class 10 Student',
      location: 'Khalishpur, Siwan',
      content:
        'The science and computer labs are exceptional. My son scored 94% in his terminal examinations thanks to the dedicated teachers and evening doubt-clearing sessions at the SARS campus.',
      rating: 5,
    },
    {
      name: 'Sunita Devi',
      role: 'Parent of Class 6 Student',
      location: 'Bhatwalia, Siwan',
      content:
        'The online fee payment system and mobile parent portal make it so easy to monitor attendance, homework, and pay fees instantly. SARS has truly modernized school education in Siwan.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
            Parent & Alumni Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
            Trusted by Hundreds of Families Across Bihar
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Read what parents and guardians have to say about the academic standards, residential care, and values at SARS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-900 text-gold-400 flex items-center justify-center font-bold text-sm shadow-inner">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                  <p className="text-[10px] text-gold-600 font-medium">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
