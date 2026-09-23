import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Navigation, Clock, ShieldAlert } from 'lucide-react';

export default function LocationMapSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Campus Address & Visiting Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                Campus Location
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
                Visit Our Campus in Baghra, Siwan
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Situated in the peaceful green surroundings of Baghra (Khalishpur), easily accessible from Siwan town center, Bhatwalia, and Badli-Hasuwa Road.
              </p>
            </div>

            {/* Address & Contact Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-brand-900 text-gold-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Campus Address</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Village Baghra, Post Khalishpur, (Near Suta Factory, Badli-Hasuwa Road), Siwan Sadar, Bihar - 841226
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-700 text-white shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Admission & Office Helplines</h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    +91 9006326786 / +91 7543073786 / +91 7479600063
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Visiting & Office Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Monday to Saturday: 8:00 AM – 3:30 PM (Sunday Closed)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://maps.google.com/?q=Shabab+Ashraf+Residential+School+Baghra+Siwan+Bihar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold shadow-md transition-all"
              >
                <Navigation className="w-4 h-4 text-gold-400" />
                Open in Google Maps
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                Enquire Online
              </Link>
            </div>
          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 h-96 sm:h-[420px] relative">
              <iframe
                title="Shabab Ashraf Residential School Location Map"
                src="https://maps.google.com/maps?q=Shabab+Ashraf+Residential+School+Baghra+Siwan+Bihar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 text-xs font-bold text-brand-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>SARS Campus, Siwan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
