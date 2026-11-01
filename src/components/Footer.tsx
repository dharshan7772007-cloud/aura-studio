import React from 'react';
import { PageView } from '../types';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <footer className="bg-[#302820] text-[#F5F0E8] border-t border-[#4A3E33]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#4A3E33]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl tracking-[0.25em] font-semibold text-[#F5F0E8] uppercase">
                AURA
              </span>
              <span className="text-xs tracking-[0.35em] text-[#C5A477] uppercase font-sans">
                STUDIO
              </span>
            </div>
            <p className="font-serif italic text-lg text-[#C5A477] max-w-sm">
              &ldquo;Your moment. Your ritual. Your glow.&rdquo;
            </p>
            <p className="text-sm text-[#D8C8B5]/80 leading-relaxed max-w-sm">
              A bespoke architectural sanctuary dedicated to restoring calm, radiant skin, and balanced wellness through mindful sensory rituals and master craftsmanship.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A477] hover:text-[#F5F0E8] transition-colors group"
              >
                <span>Reserve An Appointment</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Studio Hours & Location */}
          <div className="lg:col-span-3 space-y-4 text-sm text-[#D8C8B5]">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A477] font-semibold">
              The Sanctuary
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A477] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Pavilion Court, 42 Magnolia Lane,
                  <br />
                  Indiranagar, Bengaluru 560038
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A477] shrink-0" />
                <span className="text-xs">+91 80 4920 7800</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A477] shrink-0" />
                <span className="text-xs">concierge@aurastudio.com</span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-3 space-y-4 text-sm text-[#D8C8B5]">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A477] font-semibold">
              Studio Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A477] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#F5F0E8]/70">Monday &ndash; Saturday</span>
                    <span className="text-white font-medium">9:30 AM &ndash; 8:30 PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#F5F0E8]/70">Sunday Rituals</span>
                    <span className="text-white font-medium">10:00 AM &ndash; 6:00 PM</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#D8C8B5]/60 pt-2 italic">
                Advance reservations required for optimal preparation of botanical oils.
              </p>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A477] font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C8B5]">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#F5F0E8] transition-colors"
                >
                  Treatment Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ritual-match')}
                  className="hover:text-[#F5F0E8] transition-colors"
                >
                  AURA Ritual Match
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F5F0E8] transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F5F0E8] transition-colors"
                >
                  Contact & Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-appointments')}
                  className="hover:text-[#F5F0E8] transition-colors"
                >
                  My Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-[#C5A477] transition-colors text-[11px] uppercase tracking-wider"
                >
                  Admin Console Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#D8C8B5]/60">
          <p>
            &copy; {new Date().getFullYear()} AURA Studio. Fictional portfolio concept project for D7 Studio.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>No real payments processed</span>
            <span>&middot;</span>
            <span>Simulated availability demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
