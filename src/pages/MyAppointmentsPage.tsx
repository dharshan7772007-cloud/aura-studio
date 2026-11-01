import React, { useState } from 'react';
import { Booking, BookingStatus } from '../types';
import { cancelBooking } from '../utils/storage';
import {
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Sparkles,
} from 'lucide-react';

interface MyAppointmentsPageProps {
  bookings: Booking[];
  onRefreshBookings: () => void;
  onOpenBookingModal: () => void;
}

export const MyAppointmentsPage: React.FC<MyAppointmentsPageProps> = ({
  bookings,
  onRefreshBookings,
  onOpenBookingModal,
}) => {
  const [filter, setFilter] = useState<BookingStatus | 'all'>('upcoming');
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const handleConfirmCancel = () => {
    if (!bookingToCancel) return;
    cancelBooking(bookingToCancel.id);
    setBookingToCancel(null);
    onRefreshBookings();
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Upcoming</span>
          </span>
        );
      case 'completed':
        return (
          <span className="text-xs uppercase tracking-wider text-[#7A6D60] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="text-xs uppercase tracking-wider text-red-700 font-medium flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled &middot; Slot Released</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-18 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#D8C8B5]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel text-xs uppercase tracking-[0.25em] text-[#A98759] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A477]" />
            <span>Guest Portal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#302820] font-light">
            My Sanctuary Appointments
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6D60]">
            Review your upcoming rituals, past session histories, and manage scheduling.
          </p>
        </div>

        <button
          onClick={onOpenBookingModal}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest transition-all self-start sm:self-auto shrink-0 shadow-md"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A477]" />
          <span>Book New Ritual</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D8C8B5] pb-2">
        {(['upcoming', 'completed', 'cancelled', 'all'] as const).map((st) => {
          const count = bookings.filter((b) => (st === 'all' ? true : b.status === st)).length;
          const isSelected = filter === st;
          return (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors relative font-medium ${
                isSelected ? 'text-[#302820] font-semibold' : 'text-[#7A6D60] hover:text-[#302820]'
              }`}
            >
              <span>{st.charAt(0).toUpperCase() + st.slice(1)}</span>
              <span className="ml-1.5 opacity-60 text-[11px]">({count})</span>
              {isSelected && (
                <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-[#C5A477]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 glass-panel border border-[#D8C8B5] space-y-4 shadow-sm">
          <Calendar className="w-9 h-9 text-[#C5A477] mx-auto" />
          <h3 className="font-serif text-2xl text-[#302820]">
            No {filter !== 'all' ? filter : ''} appointments found
          </h3>
          <p className="text-xs text-[#7A6D60] max-w-sm mx-auto leading-relaxed">
            {filter === 'upcoming'
              ? 'You have no upcoming sanctuary reservations scheduled. Claim your moment of relaxation today.'
              : 'There are currently no records in this view.'}
          </p>
          <button
            onClick={onOpenBookingModal}
            className="px-6 py-2.5 bg-[#302820] text-xs uppercase tracking-wider text-[#F5F0E8] hover:bg-[#4A3E33] transition-colors"
          >
            Schedule a Treatment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const isUpcoming = booking.status === 'upcoming';
            return (
              <div
                key={booking.id}
                className={`p-7 border glass-panel transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md ${
                  booking.status === 'cancelled'
                    ? 'border-[#D8C8B5]/50 opacity-75'
                    : 'border-[#D8C8B5] hover:border-[#C5A477]'
                }`}
              >
                {/* Left block: details */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 bg-[#ECE5DA] text-[#302820] border border-[#D8C8B5]">
                      {booking.reference}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#A98759] font-medium">
                      {booking.category}
                    </span>
                    <span className="text-xs">{getStatusBadge(booking.status)}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#302820]">
                      {booking.serviceName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A6D60] mt-1.5">
                      <span className="flex items-center gap-1 font-medium text-[#302820]">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A477]" />
                        {booking.date}
                      </span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1 font-medium text-[#302820]">
                        <Clock className="w-3.5 h-3.5 text-[#C5A477]" />
                        {booking.timeSlot} ({booking.duration} mins)
                      </span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#7A6D60]" />
                        {booking.specialistName}
                      </span>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <p className="text-xs text-[#7A6D60] italic bg-[#FDFBF9] p-2.5 border-l-2 border-[#C5A477]">
                      Preferences: &ldquo;{booking.specialRequests}&rdquo;
                    </p>
                  )}
                </div>

                {/* Right block: Price & Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-[#D8C8B5]/50 gap-4 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block font-medium">
                      Session Amount
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#302820] tabular-nums">
                      ₹{booking.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isUpcoming && (
                      <button
                        onClick={() => setBookingToCancel(booking)}
                        className="px-4 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                    )}

                    {booking.status === 'cancelled' && (
                      <button
                        onClick={onOpenBookingModal}
                        className="px-4 py-1.5 border border-[#302820] text-[#302820] hover:bg-[#ECE5DA] text-xs uppercase tracking-wider transition-colors"
                      >
                        Re-book Slot
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancellation Confirmation Dialog */}
      {bookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#302820]/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#F5F0E8] border border-[#C5A477]/50 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertTriangle className="w-6 h-6 text-[#A98759]" />
              <h3 className="font-serif text-2xl font-semibold text-[#302820]">
                Confirm Cancellation
              </h3>
            </div>

            <p className="text-xs text-[#7A6D60] leading-relaxed">
              Are you sure you want to cancel your appointment for{' '}
              <strong className="text-[#302820]">{bookingToCancel.serviceName}</strong> on{' '}
              <strong className="text-[#302820]">
                {bookingToCancel.date} at {bookingToCancel.timeSlot}
              </strong>{' '}
              (Ref: {bookingToCancel.reference})?
            </p>

            <p className="text-[11px] text-[#A98759] italic bg-[#ECE5DA] p-3 border border-[#D8C8B5]">
              Once cancelled, this time slot will be instantly released and made available for other guests to book.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setBookingToCancel(null)}
                className="px-4 py-2 border border-[#D8C8B5] text-xs uppercase tracking-wider text-[#7A6D60] hover:text-[#302820]"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                Yes, Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
