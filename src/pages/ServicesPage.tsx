import React, { useState } from 'react';
import { Service, ServiceCategory } from '../types';
import { SERVICES } from '../data/services';
import { ServiceImage } from '../components/ServiceImage';
import { Clock, Search, Check, Sparkles, Filter, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onSelectServiceAndBook: (serviceId: string) => void;
  onOpenRitualMatch: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectServiceAndBook,
  onOpenRitualMatch,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');

  // Filter logic
  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'duration') return a.duration - b.duration;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  const categories: { key: ServiceCategory | 'all'; label: string; count: number }[] = [
    { key: 'all', label: 'All Treatments', count: SERVICES.length },
    {
      key: 'skincare',
      label: 'Skincare',
      count: SERVICES.filter((s) => s.category === 'skincare').length,
    },
    {
      key: 'hair',
      label: 'Hair Care',
      count: SERVICES.filter((s) => s.category === 'hair').length,
    },
    {
      key: 'wellness',
      label: 'Wellness',
      count: SERVICES.filter((s) => s.category === 'wellness').length,
    },
    {
      key: 'occasions',
      label: 'Special Occasions',
      count: SERVICES.filter((s) => s.category === 'occasions').length,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-18 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A477]" />
          <span>The Treatment Sanctuary</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#302820] font-light leading-[1.12]">
          Ritual Menu & Master Offerings
        </h1>
        <p className="text-sm sm:text-base text-[#7A6D60] leading-relaxed">
          Every experience at AURA is a sensory journey. We combine organic botanical preparations, master anatomical touch, and tranquil private suites to replenish your skin, hair, and spirit.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 pb-4 border-b border-[#D8C8B5]">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#302820] text-[#F5F0E8] border-[#302820] shadow-sm'
                    : 'glass-panel text-[#7A6D60] border-[#D8C8B5] hover:border-[#302820] hover:text-[#302820]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-60 text-[10px]">({cat.count})</span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#7A6D60] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by treatment name, facial, peel, or stone..."
              className="w-full pl-9 pr-4 py-2.5 glass-panel border border-[#D8C8B5] text-xs text-[#302820] focus:outline-none focus:border-[#C5A477]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A6D60] hover:text-[#302820]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector & Ritual Match link */}
          <div className="flex items-center gap-3 justify-between sm:justify-end">
            <div className="flex items-center gap-2 text-xs text-[#7A6D60]">
              <Filter className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="glass-panel border border-[#D8C8B5] px-2.5 py-1.5 text-xs text-[#302820] focus:outline-none focus:border-[#C5A477]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>

            <button
              onClick={onOpenRitualMatch}
              className="text-xs uppercase tracking-wider text-[#A98759] hover:text-[#302820] font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A477]" />
              <span className="hidden md:inline">Need guidance? Ritual Match</span>
              <span className="md:hidden">Ritual Match</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {sortedServices.length === 0 ? (
        <div className="text-center py-16 glass-panel border border-[#D8C8B5] space-y-4">
          <p className="font-serif text-2xl text-[#302820]">No rituals found</p>
          <p className="text-xs text-[#7A6D60] max-w-sm mx-auto">
            No experiences matched your search criteria &ldquo;{searchQuery}&rdquo;. Try clearing your search term or exploring all categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-5 py-2 bg-[#302820] text-xs uppercase tracking-wider text-[#F5F0E8]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedServices.map((service) => (
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

                  <p className="text-xs text-[#7A6D60] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#D8C8B5]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block font-semibold">
                      Ritual Highlights:
                    </span>
                    {service.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#7A6D60]">
                        <Check className="w-3.5 h-3.5 text-[#C5A477] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] text-[#7A6D60]/90 italic">
                    <span className="font-medium not-italic text-[#302820]">Ideal for:</span> {service.idealFor}
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Book Now button */}
              <div className="px-7 pb-7 pt-3 flex items-center justify-between border-t border-[#D8C8B5]/50 bg-[#FDFBF9]/80">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block">
                    Session Investment
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#302820] tabular-nums">
                    ₹{service.price.toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  onClick={() => onSelectServiceAndBook(service.id)}
                  className="relative group overflow-hidden px-5 py-2.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest font-medium transition-all shadow-xs"
                >
                  <span className="relative z-10">Book Now</span>
                  <div className="absolute inset-0 border border-[#C5A477]/50" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Complimentary Custom Consultation Callout */}
      <div className="p-8 sm:p-10 glass-panel border border-[#C5A477]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 max-w-xl">
          <h4 className="font-serif text-2xl font-semibold text-[#302820]">
            Seeking an unlisted custom multi-ritual day?
          </h4>
          <p className="text-xs text-[#7A6D60] leading-relaxed">
            Our head concierge can combine facial radiance, scalp treatments, and deep body relaxation into a singular private sanctuary day.
          </p>
        </div>
        <button
          onClick={onOpenRitualMatch}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#302820] text-[#F5F0E8] text-xs uppercase tracking-widest hover:bg-[#4A3E33] transition-colors shrink-0 shadow-sm"
        >
          <span>AURA Ritual Match</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A477]" />
        </button>
      </div>
    </div>
  );
};
