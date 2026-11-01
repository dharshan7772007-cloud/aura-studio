import { Booking, BookingStatus } from '../types';
import { TIME_SLOTS } from '../data/services';

const STORAGE_KEY = 'aura_appointments_v1';

// Seed initial realistic appointments for demonstration
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'demo-booking-1',
    reference: 'AURA-58210',
    serviceId: 'skincare-signature-glow',
    serviceName: 'Signature Glow Facial',
    category: 'skincare',
    price: 1499,
    duration: 60,
    specialistId: 'specialist-elena',
    specialistName: 'Elena Rostova',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from today
    timeSlot: '11:00 AM',
    customerName: 'Kavya Mehra',
    customerEmail: 'kavya.m@example.com',
    customerPhone: '+91 98201 44520',
    specialRequests: 'Prefers quiet session with rosehip oil formulation.',
    status: 'upcoming',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'demo-booking-2',
    reference: 'AURA-41092',
    serviceId: 'wellness-relaxation-ritual',
    serviceName: 'Relaxation Ritual',
    category: 'wellness',
    price: 1999,
    duration: 90,
    specialistId: 'specialist-priya',
    specialistName: 'Priya Sharma',
    date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], // 4 days from today
    timeSlot: '03:30 PM',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.d@example.com',
    customerPhone: '+91 97112 88410',
    specialRequests: 'Focus on lower back and shoulder tension relief.',
    status: 'upcoming',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'demo-booking-3',
    reference: 'AURA-32984',
    serviceId: 'hair-spa-ritual',
    serviceName: 'Hair Spa Ritual',
    category: 'hair',
    price: 1499,
    duration: 60,
    specialistId: 'specialist-marcus',
    specialistName: 'Marcus Vance',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], // 3 days ago
    timeSlot: '02:00 PM',
    customerName: 'Rohan Varma',
    customerEmail: 'rohan.v@example.com',
    customerPhone: '+91 99004 31256',
    specialRequests: 'Deep conditioning treatment for post-travel dry hair.',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export function getBookings(): Booking[] {
  if (typeof window === 'undefined') return INITIAL_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
}

export function saveBookings(bookings: Booking[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e);
  }
}

export function createBooking(
  data: Omit<Booking, 'id' | 'reference' | 'createdAt' | 'status'>
): Booking {
  const current = getBookings();
  const randomRefNum = Math.floor(10000 + Math.random() * 90000);
  const newBooking: Booking = {
    ...data,
    id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reference: `AURA-${randomRefNum}`,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };

  const updated = [newBooking, ...current];
  saveBookings(updated);
  return newBooking;
}

export function cancelBooking(id: string): boolean {
  const current = getBookings();
  let found = false;
  const updated = current.map((b) => {
    if (b.id === id || b.reference === id) {
      found = true;
      return { ...b, status: 'cancelled' as BookingStatus };
    }
    return b;
  });

  if (found) {
    saveBookings(updated);
  }
  return found;
}

export function updateBookingStatus(id: string, status: BookingStatus): boolean {
  const current = getBookings();
  let found = false;
  const updated = current.map((b) => {
    if (b.id === id || b.reference === id) {
      found = true;
      return { ...b, status };
    }
    return b;
  });

  if (found) {
    saveBookings(updated);
  }
  return found;
}

/**
 * Checks if a specific slot is already reserved for a date and specialist.
 * Note: Only active (upcoming) bookings block a slot. Cancelled bookings do NOT block slots!
 */
export function isSlotBooked(date: string, timeSlot: string, specialistId?: string): boolean {
  const bookings = getBookings();
  return bookings.some((b) => {
    if (b.status === 'cancelled') return false; // Cancelled slots are freed!
    if (b.date !== date) return false;
    if (b.timeSlot !== timeSlot) return false;
    if (!specialistId || specialistId === 'specialist-any' || b.specialistId === 'specialist-any') {
      // If specialist is general or matched, block
      return true;
    }
    return b.specialistId === specialistId;
  });
}

export function getAvailableSlots(date: string, specialistId?: string): { slot: string; available: boolean }[] {
  return TIME_SLOTS.map((slot) => ({
    slot,
    available: !isSlotBooked(date, slot, specialistId),
  }));
}

export function resetToDemoData(): Booking[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
  }
  return INITIAL_BOOKINGS;
}
