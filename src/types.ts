export type ServiceCategory = 'skincare' | 'hair' | 'wellness' | 'occasions';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  price: number;
  duration: number; // in minutes
  description: string;
  benefits: string[];
  idealFor: string;
  imageType: 'skincare-glow' | 'skincare-hydrate' | 'skincare-radiance' | 'hair-style' | 'hair-spa' | 'hair-finish' | 'wellness-relax' | 'wellness-aroma' | 'wellness-calm' | 'occasion-bridal' | 'occasion-event';
  popular?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialties: ServiceCategory[];
  avatarInitial: string;
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  reference: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  price: number;
  duration: number;
  specialistId: string;
  specialistName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
}

export type RitualExperience = 'Relaxation' | 'Skincare' | 'Hair care' | 'Special occasion';
export type RitualBudget = 'Under ₹1,000' | '₹1,000–₹1,500' | '₹1,500–₹2,500' | 'Above ₹2,500';
export type RitualDuration = '30–45 minutes' | '60–75 minutes' | '90–120 minutes';
export type RitualPreference = 'Fragrance-free products' | 'Quiet environment' | 'Gentle experience' | 'No special preference';

export interface RitualMatchAnswers {
  experience: RitualExperience | null;
  budget: RitualBudget | null;
  duration: RitualDuration | null;
  preferences: RitualPreference[];
}

export interface RitualMatchResult {
  primaryMatch: Service;
  matchScore: number;
  reasoning: string;
  matchedAttributes: string[];
  alternatives: Service[];
}

export type PageView = 'home' | 'services' | 'ritual-match' | 'my-appointments' | 'about' | 'contact' | 'admin';
