import React, { useState } from 'react';
import { PageView } from '../types';
import { Calendar, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBookingModal: () => void;
  upcomingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal,
  upcomingCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView; badge?: number }[] = [
    { label: 'Services', page: 'services' },
    { label: 'Ritual Match', page: 'ritual-match' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'My Bookings', page: 'my-appointments', badge: upcomingCount },
  ];

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#D8C8B5]/50 transition-all">
      {/* Top micro-bar for portfolio demo notice */}
      <div className="bg-[#302820] text-[#D8C8B5] text-[11px] py-1 px-4 text-center tracking-widest uppercase">
        <span className="opacity-90">Portfolio Concept Demonstration &middot; D7 Studio &middot; Premium Wellness Architecture</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group focus:outline-none"
          aria-label="AURA Studio Home"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#302820] uppercase group-hover:text-[#C5A477] transition-colors whitespace-nowrap shrink-0">
              AURA
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#7A6D60] font-medium font-sans">
              STUDIO
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-[#7A6D60]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#302820] ${
                  isActive ? 'text-[#302820] font-semibold' : ''
                }`}
              >
                {link.label}
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="ml-1.5 text-[11px] text-[#C5A477] font-sans font-bold">
                    ({link.badge})
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A477]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Admin Entry */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('admin')}
            title="Demo Admin Console"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider transition-colors border ${
              currentPage === 'admin'
                ? 'bg-[#302820] text-[#F5F0E8] border-[#302820]'
                : 'text-[#7A6D60] hover:text-[#302820] border-transparent hover:border-[#D8C8B5]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#302820] hover:bg-[#4A3E33] active:bg-[#201A15] text-[#F5F0E8] text-xs font-medium uppercase tracking-widest transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A477]" />
            <span>Book Experience</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#302820] hover:text-[#C5A477] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F0E8] border-b border-[#D8C8B5] px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`flex items-center justify-between text-left py-2 text-sm uppercase tracking-wider ${
                  currentPage === link.page
                    ? 'text-[#302820] font-semibold pl-2 border-l-2 border-[#C5A477]'
                    : 'text-[#7A6D60]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="text-xs text-[#C5A477] font-bold">
                    {link.badge} upcoming
                  </span>
                )}
              </button>
            ))}
            <div className="pt-4 border-t border-[#D8C8B5]/50 flex items-center justify-between">
              <button
                onClick={() => handleLinkClick('admin')}
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6D60] hover:text-[#302820]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
