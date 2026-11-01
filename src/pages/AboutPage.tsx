import React from 'react';
import { SPECIALISTS } from '../data/services';
import { ArrowRight, Sparkles, Feather, Shield, Heart } from 'lucide-react';

interface AboutPageProps {
  onOpenBookingModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBookingModal }) => {
  return (
    <div className="space-y-20 md:space-y-28 pb-24">
      {/* Editorial Header */}
      <section className="pt-12 md:pt-16 max-w-5xl mx-auto px-6 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7A6D60] font-semibold">
          The Origin & Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#302820] font-light leading-[1.15]">
          A Sanctuary Dedicated To
          <br />
          <span className="italic font-normal">The Ritual of Stillness</span>
        </h1>
        <p className="text-base sm:text-lg text-[#7A6D60] font-light max-w-2xl mx-auto leading-relaxed">
          Founded on the conviction that genuine beauty blooms when the nervous system enters effortless calm, AURA Studio reimagines the contemporary salon into an architectural retreat.
        </p>
      </section>

      {/* Brand Story & Editorial Split */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-[#7A6D60] leading-relaxed text-sm sm:text-base">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A477] font-semibold block">
              The Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#302820] font-light">
              Escaping The Velocity of Modern Life
            </h2>
            <p>
              In modern cities, self-care is often treated as another rushed task on an overflowing calendar. We created AURA Studio in Indiranagar, Bengaluru, to provide an antidote to that velocity.
            </p>
            <p>
              Our suites are decoupled from street clamour by acoustic double-linen drape walls, raw travertine plinths, and warm earthen plastering. Here, your arrival is marked by the pouring of warm herbal infusions and deep aromatic exhalations rather than the chime of notification screens.
            </p>
            <p>
              Whether you come for an illuminating cellular facial, mindful scalp steam therapy, or neuromuscular relaxation, our practitioners work with an unhurried, mindful cadence that honours your personal time.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-[#C5A477]/40 p-3 bg-white shadow-sm">
              <div className="aspect-[4/3] bg-[#EAE2D4] relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 500 375" fill="none">
                  <rect width="500" height="375" fill="#EAE2D4" />
                  <ellipse cx="250" cy="220" rx="180" ry="70" fill="#D3C3B0" opacity="0.6" />
                  <ellipse cx="250" cy="200" rx="140" ry="50" fill="#F8F4EC" />
                  <ellipse cx="250" cy="180" rx="100" ry="32" fill="#EAE2D4" />
                  <ellipse cx="250" cy="165" rx="60" ry="18" fill="#C5A477" opacity="0.75" />
                  {/* Classical architectural arc */}
                  <path d="M120 320 C120 100 380 100 380 320" stroke="#7A6D60" strokeWidth="1" strokeDasharray="4 2" />
                  <text x="250" y="340" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="14" letterSpacing="4">
                    PAVILION OF MINDFUL CRAFT
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Studio Values */}
      <section className="bg-[#ECE5DA] py-16 md:py-24 border-y border-[#D8C8B5]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#302820]">
              The Four Pillars of AURA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 border border-[#D8C8B5] space-y-3">
              <span className="font-serif text-2xl text-[#C5A477] font-bold">01.</span>
              <h3 className="font-serif text-xl font-semibold text-[#302820]">
                Clean Botanical Integrity
              </h3>
              <p className="text-xs text-[#7A6D60] leading-relaxed">
                Zero parabens, artificial fragrances, or aggressive chemical strippers. We utilize pure cold-pressed bio-actives and cold-milled clay.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#D8C8B5] space-y-3">
              <span className="font-serif text-2xl text-[#C5A477] font-bold">02.</span>
              <h3 className="font-serif text-xl font-semibold text-[#302820]">
                Private Suite Architecture
              </h3>
              <p className="text-xs text-[#7A6D60] leading-relaxed">
                Every client experiences individual sound-dampened chambers. No open noisy rows, no cross-chatter, only personal tranquility.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#D8C8B5] space-y-3">
              <span className="font-serif text-2xl text-[#C5A477] font-bold">03.</span>
              <h3 className="font-serif text-xl font-semibold text-[#302820]">
                Master Artisanship
              </h3>
              <p className="text-xs text-[#7A6D60] leading-relaxed">
                Our specialists are career dermal therapists and hair architects with an average of 9 years of luxury salon immersion.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#D8C8B5] space-y-3">
              <span className="font-serif text-2xl text-[#C5A477] font-bold">04.</span>
              <h3 className="font-serif text-xl font-semibold text-[#302820]">
                Paced Restoration
              </h3>
              <p className="text-xs text-[#7A6D60] leading-relaxed">
                We book buffer times between clients so no treatment is truncated. Your time in the chamber belongs wholly to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Specialists */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
            The Artisans
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#302820]">
            Masters of the Ritual
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6D60]">
            Guided by anatomical expertise, clinical understanding, and warm empathy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALISTS.filter((s) => s.id !== 'specialist-any').map((spec) => (
            <div
              key={spec.id}
              className="bg-white border border-[#D8C8B5] p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 bg-[#302820] text-[#C5A477] flex items-center justify-center font-serif text-xl font-semibold">
                  {spec.avatarInitial}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#302820]">
                    {spec.name}
                  </h3>
                  <span className="text-xs text-[#A98759] font-medium block mt-0.5">
                    {spec.role}
                  </span>
                  <span className="text-[11px] text-[#7A6D60] uppercase tracking-wider block mt-0.5">
                    {spec.experience}
                  </span>
                </div>
                <p className="text-xs text-[#7A6D60] leading-relaxed">{spec.bio}</p>
              </div>

              <div className="pt-4 border-t border-[#D8C8B5]/50">
                <button
                  onClick={onOpenBookingModal}
                  className="text-xs uppercase tracking-wider text-[#302820] hover:text-[#C5A477] font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Book with {spec.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="p-10 sm:p-12 bg-white border border-[#C5A477] space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#302820]">
            Experience The Ritual
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6D60] max-w-lg mx-auto">
            Step away from noise and into stillness. Explore our seasonal botanical treatments or consult with our concierge.
          </p>
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs font-semibold uppercase tracking-widest transition-all shadow-sm"
          >
            <span>Reserve A Treatment</span>
            <ArrowRight className="w-4 h-4 text-[#C5A477]" />
          </button>
        </div>
      </section>
    </div>
  );
};
