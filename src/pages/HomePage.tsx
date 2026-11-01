import React from 'react';
import { PageView } from '../types';
import { SERVICES } from '../data/services';
import { ServiceImage } from '../components/ServiceImage';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import {
  ArrowRight,
  Clock,
  Sparkles,
  Compass,
  Check,
  Feather,
  Shield,
  Heart,
  ChevronRight,
  Gem,
  Award,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onSelectServiceAndBook: (serviceId: string) => void;
  onOpenBookingModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectServiceAndBook,
  onOpenBookingModal,
}) => {
  const popularServices = SERVICES.filter((s) => s.popular);

  return (
    <div className="space-y-24 md:space-y-36 pb-28 overflow-hidden">
      {/* 1. CINEMATIC 3D EDITORIAL HERO SECTION */}
      <section className="relative pt-6 md:pt-14 max-w-7xl mx-auto px-6">
        {/* Soft Ambient Radial Glow in the background */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C5A477]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#D8C8B5]/20 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
          {/* Left Column: Brand Copy & Campaign CTAs */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 glass-panel border border-[#C5A477]/30 text-xs text-[#7A6D60] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A477]" />
              <span>Haute Wellness &middot; Bengaluru Sanctuary</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#302820] leading-[1.08] tracking-tight">
                Your moment.
                <br />
                <span className="italic font-normal gold-gradient-text">
                  Your ritual.
                </span>
                <br />
                Your glow.
              </h1>

              <p className="text-base sm:text-lg text-[#7A6D60] font-light leading-relaxed max-w-xl">
                Immerse yourself in tailored skincare rejuvenation, architectural hair artistry, and sensory botanical therapies. Every session is an intentional pause crafted around your personal rhythm.
              </p>
            </div>

            {/* Campaign CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBookingModal}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#302820] text-[#F5F0E8] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-xl hover:bg-[#4A3E33]"
              >
                <span className="relative z-10">Book Your Experience</span>
                <ArrowRight className="w-4 h-4 text-[#C5A477] relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 border border-[#C5A477]/60 pointer-events-none" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-panel border border-[#D8C8B5] hover:border-[#302820] text-[#302820] text-xs font-semibold uppercase tracking-[0.2em] transition-all"
              >
                <span>Discover Services</span>
              </button>
            </div>

            {/* Credibility Markers */}
            <div className="pt-8 border-t border-[#D8C8B5]/50 grid grid-cols-3 gap-6 text-[#7A6D60]">
              <div className="space-y-0.5">
                <span className="block font-serif text-3xl font-normal text-[#302820] tabular-nums">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#7A6D60]">
                  Botanical Bio-Actives
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif text-3xl font-normal text-[#302820] tabular-nums">
                  1:1
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#7A6D60]">
                  Private Suites
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif text-3xl font-normal text-[#302820] tabular-nums">
                  4.9★
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#7A6D60]">
                  Guest Esteem
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Sculptural Wellness Artwork */}
          <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[540px] flex items-center justify-center">
            {/* Architectural Frame Border */}
            <div className="absolute inset-2 border border-[#C5A477]/30 pointer-events-none -z-0" />
            <div className="absolute inset-0 bg-[#ECE5DA]/40 -z-10" />

            {/* Live Three.js 3D Viewport Canvas */}
            <Hero3DCanvas className="w-full h-full" />

            {/* Floating Luxury Editorial Badge */}
            <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 shadow-sm text-[10px] uppercase tracking-widest text-[#302820] border border-[#C5A477]/40 pointer-events-none">
              Interactive 3D Focus
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND PILLARS: MATERIAL LUXURY TILES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 glass-panel border border-[#D8C8B5]/80 space-y-4 hover:border-[#C5A477] transition-all group">
            <div className="w-12 h-12 bg-[#302820] text-[#C5A477] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Feather className="w-5 h-5 text-[#C5A477]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#302820]">
              Botanical Formulations
            </h3>
            <p className="text-xs text-[#7A6D60] leading-relaxed">
              Every serum, mist, and mask is small-batch compounded with cold-pressed bio-actives and zero synthetic fragrances.
            </p>
          </div>

          <div className="p-7 glass-panel border border-[#D8C8B5]/80 space-y-4 hover:border-[#C5A477] transition-all group">
            <div className="w-12 h-12 bg-[#302820] text-[#C5A477] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Gem className="w-5 h-5 text-[#C5A477]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#302820]">
              Master Craftsmen
            </h3>
            <p className="text-xs text-[#7A6D60] leading-relaxed">
              Our aestheticians and stylists bring over a decade of international salon leadership and dermal specialization.
            </p>
          </div>

          <div className="p-7 glass-panel border border-[#D8C8B5]/80 space-y-4 hover:border-[#C5A477] transition-all group">
            <div className="w-12 h-12 bg-[#302820] text-[#C5A477] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-[#C5A477]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#302820]">
              Private Chambers
            </h3>
            <p className="text-xs text-[#7A6D60] leading-relaxed">
              Individual sound-dampened treatment suites ensuring uninterrupted stillness, custom lighting, and dedicated attention.
            </p>
          </div>

          <div className="p-7 glass-panel border border-[#D8C8B5]/80 space-y-4 hover:border-[#C5A477] transition-all group">
            <div className="w-12 h-12 bg-[#302820] text-[#C5A477] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-[#C5A477]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#302820]">
              Mindful Pacing
            </h3>
            <p className="text-xs text-[#7A6D60] leading-relaxed">
              We never rush or double-book. Each appointment includes generous consultation and herbal tea decompression.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
            Curated Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#302820] font-light">
            Four Pillars of Self-Care
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6D60] leading-relaxed">
            From dermal illumination to restorative somatic bodywork, explore our artisanal offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Skincare',
              desc: 'Targeted hydration, brightening peels, and barrier repair.',
              starting: '₹1,299',
              tag: 'Facial Rituals',
            },
            {
              title: 'Hair Architecture',
              desc: 'Scalp steam therapy, precision styling, and gloss seals.',
              starting: '₹799',
              tag: 'Strand Care',
            },
            {
              title: 'Sensory Wellness',
              desc: 'Basalt stone therapy, aromatherapy, and somatic calm.',
              starting: '₹1,499',
              tag: 'Holistic Body',
            },
            {
              title: 'Special Occasions',
              desc: 'Couture bridal glow, red-carpet hair, and makeup priming.',
              starting: '₹2,499',
              tag: 'Gala & Bridal',
            },
          ].map((cat) => (
            <div
              key={cat.title}
              onClick={() => onNavigate('services')}
              className="p-7 glass-panel border border-[#D8C8B5] hover:border-[#C5A477] transition-all cursor-pointer group flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 duration-300"
            >
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-[#A98759] font-medium block">
                  {cat.tag}
                </span>
                <h3 className="font-serif text-2xl text-[#302820] group-hover:text-[#C5A477] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#7A6D60] leading-relaxed">{cat.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#D8C8B5]/50 flex items-center justify-between">
                <span className="text-xs text-[#7A6D60]">
                  From <strong className="text-[#302820] font-semibold">{cat.starting}</strong>
                </span>
                <span className="text-xs uppercase tracking-wider text-[#302820] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A477]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR TREATMENTS: REDESIGNED PREMIUM CARDS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-12 pb-4 border-b border-[#D8C8B5]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
              Client Favourites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#302820] mt-1 font-light">
              Popular Treatments
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs uppercase tracking-widest text-[#302820] hover:text-[#C5A477] font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <span>View Complete Menu (11 Services)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularServices.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="glass-panel border border-[#D8C8B5] overflow-hidden flex flex-col justify-between group hover:border-[#C5A477] transition-all hover:shadow-xl duration-500"
            >
              <div>
                <ServiceImage service={service} aspectRatio="4/3" />
                <div className="p-7 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#7A6D60]">
                    <span className="uppercase tracking-wider font-medium">{service.categoryLabel}</span>
                    <span className="flex items-center gap-1 font-medium text-[#302820]">
                      <Clock className="w-3.5 h-3.5 text-[#C5A477]" />
                      {service.duration} mins
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#302820] group-hover:text-[#C5A477] transition-colors font-medium">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#7A6D60] leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#D8C8B5]/40">
                    {service.benefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#7A6D60]">
                        <Check className="w-3.5 h-3.5 text-[#C5A477] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Gold Accented Button */}
              <div className="px-7 pb-7 pt-3 flex items-center justify-between border-t border-[#D8C8B5]/50 bg-[#FDFBF9]/80">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block">
                    Investment
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#302820] tabular-nums">
                    ₹{service.price.toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  onClick={() => onSelectServiceAndBook(service.id)}
                  className="relative group overflow-hidden px-5 py-2.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-wider transition-all font-medium shadow-xs"
                >
                  <span className="relative z-10">Book Ritual</span>
                  <div className="absolute inset-0 border border-[#C5A477]/50" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AURA RITUAL MATCH: LUXURY CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#302820] text-[#F5F0E8] p-8 sm:p-14 lg:p-16 relative overflow-hidden border border-[#C5A477]/40 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A3E33] border border-[#C5A477]/40 text-xs uppercase tracking-[0.25em] text-[#C5A477] font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Consultation Engine</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              Unsure which ritual your body craves today?
            </h2>

            <p className="text-sm sm:text-base text-[#D8C8B5]/90 leading-relaxed font-light">
              Experience the <strong>AURA Ritual Match</strong>: an interactive four-step consultation that transparently aligns your desired experience, time allocation, budget, and sensory preferences with our master treatments.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('ritual-match')}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#C5A477] hover:bg-[#D5B68A] text-[#302820] text-xs font-semibold uppercase tracking-widest transition-all shadow-md"
              >
                <span>Begin Ritual Match</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-[#D8C8B5]/70 italic text-center sm:text-left">
                Takes ~60 seconds &middot; 100% Transparent Rule Matching
              </span>
            </div>
          </div>

          {/* Background decorative gold arcs */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 300 400" fill="none">
              <circle cx="200" cy="200" r="180" stroke="#C5A477" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="120" stroke="#C5A477" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="60" stroke="#C5A477" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* 6. STUDIO EXPERIENCE & ARCHITECTURAL SANCTUARY */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="border border-[#C5A477]/40 p-4 glass-panel shadow-lg">
              <div className="aspect-[4/3] bg-[#EAE2D4] relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                  <rect width="400" height="300" fill="#EAE2D4" />
                  <path d="M50 250 L350 250" stroke="#C5A477" strokeWidth="1.5" />
                  <path d="M120 250 L120 100 L280 100 L280 250" stroke="#7A6D60" strokeWidth="1" strokeDasharray="3 3" />
                  <ellipse cx="200" cy="180" rx="90" ry="25" fill="#D8C8B5" opacity="0.6" />
                  <ellipse cx="200" cy="170" rx="70" ry="18" fill="#F5F0E8" />
                  <text x="200" y="174" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="12" letterSpacing="2">
                    PRIVATE SUITE EXPERIENCE
                  </text>
                  <circle cx="200" cy="100" r="40" stroke="#C5A477" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
              The Studio Sanctuary
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#302820] font-light">
              Designed For Deep Sensory Stillness
            </h2>
            <p className="text-sm text-[#7A6D60] leading-relaxed">
              Every detail at AURA Studio has been engineered to counteract sensory fatigue. From acoustic dampening with linen tapestries to ambient circadian lighting and custom sandalwood-infused ventilation, we invite you into a restorative state from the moment you step through our pavilion doors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#302820]">
              <div className="p-5 glass-panel border border-[#D8C8B5]/80 space-y-1.5">
                <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#A98759]">
                  Herbal Tea Welcome
                </h4>
                <p className="text-[#7A6D60] leading-relaxed">
                  Warm infusions of tulsi, lemongrass, and chamomile upon arrival to calm the nervous system.
                </p>
              </div>
              <div className="p-5 glass-panel border border-[#D8C8B5]/80 space-y-1.5">
                <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#A98759]">
                  Tailored Music Soundscapes
                </h4>
                <p className="text-[#7A6D60] leading-relaxed">
                  Delta-wave ambient frequencies and natural water textures calibrated for theta-state relaxation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
            Guest Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#302820] font-light">
            Stories of Restoration
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6D60]">
            Attributable experiences from guests who made AURA their sanctuary ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                'The Signature Glow Facial changed my skin entirely. Elena’s touch is mindful and restorative; my skin retained a dewy luminescence for over two weeks.',
              name: 'Dr. Sunita Rao',
              role: 'Pediatric Surgeon',
              treatment: 'Signature Glow Facial &middot; Elena Rostova',
            },
            {
              quote:
                'After long international flights, the Relaxation Ritual with warm basalt stones is non-negotiable. The quiet environment and private chamber are unmatched in Bengaluru.',
              name: 'Vikram Sengupta',
              role: 'Architectural Director',
              treatment: 'Relaxation Ritual &middot; Priya Sharma',
            },
            {
              quote:
                'Marcus transformed my hair before our engagement ceremony with the Hair Spa Ritual. The steam infusion and scalp acupressure left my hair silk-like with natural bounce.',
              name: 'Meera Chawla',
              role: 'Creative Producer',
              treatment: 'Hair Spa Ritual &middot; Marcus Vance',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 glass-panel border border-[#D8C8B5] flex flex-col justify-between space-y-6 shadow-sm hover:border-[#C5A477] transition-all"
            >
              <p className="font-serif text-base sm:text-lg italic text-[#302820] leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-[#D8C8B5]/50 space-y-1">
                <div className="font-semibold text-sm text-[#302820]">{item.name}</div>
                <div className="text-xs text-[#7A6D60]">{item.role}</div>
                <div
                  className="text-[11px] text-[#C5A477] font-medium pt-1"
                  dangerouslySetInnerHTML={{ __html: item.treatment }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL BOOKING CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-10 sm:p-16 glass-panel border border-[#C5A477]/50 text-center space-y-6 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#302820] max-w-xl mx-auto font-light">
            Ready to claim your moment of unhurried stillness?
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6D60] max-w-md mx-auto leading-relaxed">
            Reserve your preferred treatment date and master specialist. Advance reservation recommended for weekend appointments.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBookingModal}
              className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-xl"
            >
              <span>Book Your Sanctuary Ritual</span>
              <ArrowRight className="w-4 h-4 text-[#C5A477]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
