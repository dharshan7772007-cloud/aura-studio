import React from 'react';
import { Service } from '../types';

interface ServiceImageProps {
  service: Service;
  className?: string;
  aspectRatio?: '4/3' | '16/9' | 'square';
}

export const ServiceImage: React.FC<ServiceImageProps> = ({
  service,
  className = '',
  aspectRatio = '4/3',
}) => {
  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  // Distinct elegant motifs for each service category & type
  const renderArtisticIllustration = () => {
    switch (service.imageType) {
      case 'skincare-glow':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#EAE3D6" />
            <radialGradient id="glowG" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFF9F0" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#E2D4C3" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#D5C2AD" stopOpacity="0.95" />
            </radialGradient>
            <rect width="400" height="300" fill="url(#glowG)" />
            {/* Soft geometric luxury aura circles */}
            <circle cx="200" cy="140" r="85" stroke="#C5A477" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
            <circle cx="200" cy="140" r="60" fill="#F8F3EC" fillOpacity="0.8" stroke="#C5A477" strokeWidth="1.2" />
            {/* Dropper & dewdrop motif */}
            <path d="M196 90 L204 90 L202 125 C202 128 206 135 200 142 C194 135 198 128 198 125 Z" fill="#C5A477" fillOpacity="0.85" />
            <circle cx="200" cy="155" r="5" fill="#C5A477" />
            <circle cx="200" cy="170" r="3" fill="#C5A477" fillOpacity="0.7" />
            {/* Botanical fronds */}
            <path d="M120 250 C140 210 170 190 200 195" stroke="#7A6D60" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <path d="M280 250 C260 210 230 190 200 195" stroke="#7A6D60" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <text x="200" y="235" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              BOTANICAL RADIANCE
            </text>
          </svg>
        );

      case 'skincare-hydrate':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#E4DCD0" />
            <radialGradient id="waterG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5F0E8" />
              <stop offset="100%" stopColor="#D2C3B0" />
            </radialGradient>
            <rect width="400" height="300" fill="url(#waterG)" />
            {/* Concentric ripples */}
            <ellipse cx="200" cy="150" rx="110" ry="45" stroke="#C5A477" strokeWidth="1" strokeOpacity="0.3" />
            <ellipse cx="200" cy="150" rx="75" ry="30" stroke="#C5A477" strokeWidth="1.2" strokeOpacity="0.5" />
            <ellipse cx="200" cy="150" rx="40" ry="16" stroke="#C5A477" strokeWidth="1.5" strokeOpacity="0.8" fill="#F8F4EE" />
            <circle cx="200" cy="115" r="8" fill="#C5A477" fillOpacity="0.9" />
            <path d="M192 115 C192 115 197 95 200 90 C203 95 208 115 208 115 Z" fill="#C5A477" fillOpacity="0.9" />
            <text x="200" y="240" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              HYALURONIC MOISTURE
            </text>
          </svg>
        );

      case 'skincare-radiance':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#EAE2D4" />
            <circle cx="200" cy="140" r="70" fill="#FDFBF7" stroke="#D8C8B5" strokeWidth="1" />
            {/* Sunburst radiance rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="200"
                y1="140"
                x2={200 + Math.cos((deg * Math.PI) / 180) * 88}
                y2={140 + Math.sin((deg * Math.PI) / 180) * 88}
                stroke="#C5A477"
                strokeWidth="1"
                strokeOpacity="0.45"
              />
            ))}
            <circle cx="200" cy="140" r="32" fill="#EFE8DD" stroke="#C5A477" strokeWidth="1.5" />
            <circle cx="200" cy="140" r="14" fill="#C5A477" fillOpacity="0.75" />
            <text x="200" y="245" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              ACTIVE ENZYME CLARITY
            </text>
          </svg>
        );

      case 'hair-style':
      case 'hair-finish':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#DFD6C9" />
            <path
              d="M130 90 C160 140 180 80 210 130 C240 180 260 120 280 200"
              stroke="#C5A477"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M140 105 C170 155 190 95 220 145 C250 195 270 135 290 215"
              stroke="#7A6D60"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M120 75 C150 125 170 65 200 115 C230 165 250 105 270 185"
              stroke="#302820"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
            <circle cx="200" cy="140" r="75" stroke="#C5A477" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
            <text x="200" y="240" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              ARCHITECTURAL FORM
            </text>
          </svg>
        );

      case 'hair-spa':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#E6DED2" />
            <ellipse cx="200" cy="155" rx="80" ry="25" fill="#D3C4B0" opacity="0.6" />
            {/* Steaming botanical infusion */}
            <path d="M185 140 C175 110 195 85 185 65" stroke="#C5A477" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M200 145 C210 115 190 90 205 60" stroke="#C5A477" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M215 140 C225 110 205 85 220 65" stroke="#C5A477" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* Camellia leaf */}
            <path d="M200 170 C160 160 150 195 185 200 C220 205 240 175 200 170 Z" fill="#F4EFE6" stroke="#7A6D60" strokeWidth="1" />
            <text x="200" y="245" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              DEEP RESTORATIVE STEAM
            </text>
          </svg>
        );

      case 'wellness-relax':
      case 'wellness-calm':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#DED4C5" />
            {/* Smooth Basalt Stones Balance Stack */}
            <ellipse cx="200" cy="185" rx="70" ry="22" fill="#302820" opacity="0.9" />
            <ellipse cx="200" cy="150" rx="52" ry="18" fill="#4A3E33" opacity="0.95" />
            <ellipse cx="200" cy="120" rx="36" ry="14" fill="#655546" />
            <ellipse cx="200" cy="98" rx="22" ry="9" fill="#C5A477" opacity="0.9" />
            {/* Subtle glow circle */}
            <circle cx="200" cy="140" r="95" stroke="#C5A477" strokeWidth="1" strokeOpacity="0.25" />
            <text x="200" y="245" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              SOMATIC EQUILIBRIUM
            </text>
          </svg>
        );

      case 'wellness-aroma':
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#E5DCD0" />
            {/* Essential oil vessel */}
            <path d="M190 100 L210 100 L215 130 C225 150 220 180 200 185 C180 180 175 150 185 130 Z" fill="#F8F4ED" stroke="#C5A477" strokeWidth="1.5" />
            <rect x="187" y="90" width="26" height="10" rx="2" fill="#C5A477" />
            {/* Delicate lavender botanicals */}
            <path d="M140 210 Q 170 170 185 140" stroke="#7A6D60" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="165" cy="180" r="3" fill="#A98759" />
            <circle cx="175" cy="165" r="3" fill="#A98759" />
            <path d="M260 210 Q 230 170 215 140" stroke="#7A6D60" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="235" cy="180" r="3" fill="#A98759" />
            <circle cx="225" cy="165" r="3" fill="#A98759" />
            <text x="200" y="240" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              ARISANAL BOTANICAL OILS
            </text>
          </svg>
        );

      case 'occasion-bridal':
      case 'occasion-event':
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#EAE1D3" />
            <radialGradient id="bridalG" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFFBF5" />
              <stop offset="60%" stopColor="#ECE1CF" />
              <stop offset="100%" stopColor="#DAC7AF" />
            </radialGradient>
            <rect width="400" height="300" fill="url(#bridalG)" />
            {/* Couture arch */}
            <path d="M150 230 C150 140 250 140 250 230" stroke="#C5A477" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
            <circle cx="200" cy="120" r="35" stroke="#C5A477" strokeWidth="1.5" fill="#FAF6F0" />
            <polygon points="200,95 208,112 225,120 208,128 200,145 192,128 175,120 192,112" fill="#C5A477" />
            <text x="200" y="245" textAnchor="middle" fill="#302820" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" letterSpacing="3" opacity="0.75">
              HAUTE RADIANCE
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#ECE5DA] group ${aspectClass} ${className}`}>
      {/* Zoomable Image Container */}
      <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
        {renderArtisticIllustration()}
      </div>

      {/* Luxury Vignette & Soft Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#302820]/40 via-transparent to-black/5 pointer-events-none" />

      {/* Delicate hairline gold inset border */}
      <div className="absolute inset-0 border border-[#C5A477]/30 pointer-events-none transition-colors duration-500 group-hover:border-[#C5A477]/80" />

      {/* Floating Frosted Glass Category Pill */}
      <div className="absolute top-3 left-3 px-3 py-1 glass-panel text-[10px] tracking-widest uppercase font-semibold text-[#302820] shadow-xs">
        {service.categoryLabel}
      </div>

      {service.popular && (
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#302820]/90 backdrop-blur-xs text-[10px] tracking-wider uppercase font-medium text-[#C5A477] border border-[#C5A477]/40">
          Signature Ritual
        </div>
      )}
    </div>
  );
};
