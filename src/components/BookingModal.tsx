import React, { useState, useEffect } from 'react';
import { Service, Specialist, Booking } from '../types';
import { SERVICES, SPECIALISTS, TIME_SLOTS } from '../data/services';
import { createBooking, isSlotBooked } from '../utils/storage';
import {
  X,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedSpecialistId?: string;
  onBookingSuccess?: (booking: Booking) => void;
  onGoToAppointments?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedSpecialistId,
  onBookingSuccess,
  onGoToAppointments,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  // Form states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Reset or preselect when modal opens
  useEffect(() => {
    if (isOpen) {
      if (preselectedServiceId) {
        const found = SERVICES.find((s) => s.id === preselectedServiceId);
        if (found) setSelectedService(found);
      } else if (!selectedService) {
        setSelectedService(SERVICES[0]);
      }

      if (preselectedSpecialistId) {
        const spec = SPECIALISTS.find((sp) => sp.id === preselectedSpecialistId);
        if (spec) setSelectedSpecialist(spec);
      } else if (!selectedSpecialist) {
        setSelectedSpecialist(SPECIALISTS[4]); // First available by default
      }

      // Default date to tomorrow if none selected
      if (!selectedDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split('T')[0]);
      }
    }
  }, [isOpen, preselectedServiceId, preselectedSpecialistId]);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  // Quick 14 days dates for elegant selection
  const upcomingDays = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return { dateStr, dayName, dayNum };
  });

  const handleNextFromService = () => {
    if (!selectedService) return;
    setStep(2);
  };

  const handleNextFromSpecialist = () => {
    if (!selectedSpecialist) return;
    setStep(3);
  };

  const handleNextFromDate = () => {
    if (!selectedDate) return;
    setStep(4);
  };

  const handleNextFromSlot = () => {
    if (!selectedSlot) return;
    setStep(5);
  };

  const validateCustomerDetails = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) {
      errors.name = 'Full name is required';
    }
    if (!customerEmail.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      errors.email = 'Please provide a valid email format';
    }
    if (!customerPhone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (customerPhone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Please provide a valid phone number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextFromDetails = () => {
    if (validateCustomerDetails()) {
      setStep(6);
    }
  };

  const handleFinalConfirm = () => {
    if (!selectedService || !selectedSpecialist || !selectedDate || !selectedSlot) return;

    const newBooking = createBooking({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      category: selectedService.category,
      price: selectedService.price,
      duration: selectedService.duration,
      specialistId: selectedSpecialist.id,
      specialistName: selectedSpecialist.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      specialRequests: specialRequests.trim(),
    });

    setConfirmedBooking(newBooking);
    setStep(7);
    if (onBookingSuccess) onBookingSuccess(newBooking);
  };

  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const [year, month, day] = confirmedBooking.date.split('-').map(Number);
    const parts = confirmedBooking.timeSlot.split(' ');
    const [h, m] = parts[0].split(':').map(Number);
    let hour = h;
    if (parts[1] === 'PM' && h < 12) hour += 12;
    if (parts[1] === 'AM' && h === 12) hour = 0;

    const start = new Date(Date.UTC(year, month - 1, day, hour, m));
    const end = new Date(start.getTime() + confirmedBooking.duration * 60000);

    const pad = (n: number) => (n < 10 ? '0' + n : n);
    const formatICSDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AURA Studio//Appointment//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.reference}@aurastudio.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:AURA Studio - ${confirmedBooking.serviceName}`,
      `DESCRIPTION:Your appointment for ${confirmedBooking.serviceName} with ${confirmedBooking.specialistName}. Booking Reference: ${confirmedBooking.reference}.`,
      'LOCATION:AURA Studio, Pavilion Court, 42 Magnolia Lane, Indiranagar, Bengaluru',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AURA-Booking-${confirmedBooking.reference}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCloseAndReset = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  const stepTitles = [
    'Select Treatment',
    'Select Specialist',
    'Appointment Date',
    'Time Window',
    'Guest Details',
    'Sanctuary Review',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#302820]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#F5F0E8] border border-[#C5A477]/40 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Modal Top Bar */}
        <div className="px-7 py-4.5 border-b border-[#D8C8B5] bg-[#ECE5DA]/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-semibold text-[#302820] tracking-wide">
              {step === 7 ? 'Sanctuary Reserved' : 'Reserve Your Ritual'}
            </span>
            {step < 7 && (
              <span className="text-[11px] text-[#A98759] tracking-wider uppercase font-medium">
                Step {step} of 6 &middot; {stepTitles[step - 1]}
              </span>
            )}
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 text-[#7A6D60] hover:text-[#302820] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gold Stepper line */}
        {step < 7 && (
          <div className="grid grid-cols-6 gap-1 px-7 pt-3 pb-2 bg-[#F5F0E8]">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`h-1 transition-all duration-300 ${
                  s <= step ? 'bg-[#C5A477]' : 'bg-[#D8C8B5]/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-7 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#302820] font-light">
                  1. Select Your Treatment
                </h3>
                <p className="text-xs text-[#7A6D60]">
                  Choose from our curated signature skincare, hair architecture, or wellness rituals.
                </p>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {SERVICES.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'border-[#C5A477] bg-[#ECE5DA] shadow-xs'
                          : 'border-[#D8C8B5]/70 bg-white/70 hover:bg-white hover:border-[#C5A477]/50'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider text-[#A98759] font-medium">
                            {service.categoryLabel}
                          </span>
                          {service.popular && (
                            <span className="text-[10px] text-[#7A6D60] font-medium">
                              &middot; Popular Ritual
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-xl font-semibold text-[#302820]">
                          {service.name}
                        </h4>
                        <p className="text-xs text-[#7A6D60] line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold font-serif tabular-nums text-[#302820]">
                          ₹{service.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-[#7A6D60] flex items-center justify-end gap-1 mt-0.5 font-medium">
                          <Clock className="w-3 h-3 text-[#C5A477]" />
                          <span>{service.duration} mins</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Specialist */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#302820] font-light">
                  2. Select Your Specialist
                </h3>
                <p className="text-xs text-[#7A6D60]">
                  Our master practitioners are certified artisans of stillness and rejuvenation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {SPECIALISTS.map((spec) => {
                  const isSelected = selectedSpecialist?.id === spec.id;
                  return (
                    <div
                      key={spec.id}
                      onClick={() => setSelectedSpecialist(spec)}
                      className={`p-4 border cursor-pointer transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'border-[#C5A477] bg-[#ECE5DA] shadow-xs'
                          : 'border-[#D8C8B5]/70 bg-white/70 hover:bg-white hover:border-[#C5A477]/50'
                      }`}
                    >
                      <div className="w-12 h-12 bg-[#302820] text-[#C5A477] flex items-center justify-center font-serif text-lg font-semibold shrink-0">
                        {spec.avatarInitial}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xl font-semibold text-[#302820]">
                            {spec.name}
                          </h4>
                          <span className="text-xs text-[#A98759] font-medium tracking-wide">
                            {spec.experience}
                          </span>
                        </div>
                        <p className="text-xs text-[#7A6D60] font-medium">{spec.role}</p>
                        <p className="text-xs text-[#7A6D60]/80 leading-relaxed">{spec.bio}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Select Date */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#302820] font-light">
                  3. Select Appointment Date
                </h3>
                <p className="text-xs text-[#7A6D60]">
                  Select your preferred day. Past dates are strictly restricted.
                </p>
              </div>

              {/* Fast 14-day selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#7A6D60]">
                  Upcoming Available Days
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {upcomingDays.map((d) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`p-3 border text-center transition-all ${
                          isSelected
                            ? 'border-[#302820] bg-[#302820] text-[#F5F0E8] shadow-sm'
                            : 'border-[#D8C8B5] bg-white text-[#302820] hover:border-[#C5A477]'
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-wider opacity-80">
                          {d.dayName}
                        </div>
                        <div className="text-base font-semibold font-serif mt-0.5">
                          {d.dayNum}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Manual date input fallback */}
              <div className="pt-3 border-t border-[#D8C8B5]/50 flex items-center justify-between">
                <label className="text-xs text-[#7A6D60] uppercase tracking-wider">
                  Or pick a specific calendar date:
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3.5 py-1.5 border border-[#D8C8B5] bg-white text-xs text-[#302820] focus:outline-none focus:border-[#C5A477]"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Select Time Slot */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#302820] font-light">
                  4. Select Available Time Slot
                </h3>
                <p className="text-xs text-[#7A6D60]">
                  Showing real-time availability for{' '}
                  <span className="font-medium text-[#302820]">{selectedDate}</span> with{' '}
                  <span className="font-medium text-[#302820]">{selectedSpecialist?.name}</span>.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isBooked = isSlotBooked(selectedDate, slot, selectedSpecialist?.id);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3.5 border text-center transition-all ${
                        isBooked
                          ? 'border-[#D8C8B5]/40 bg-[#ECE5DA]/50 text-[#7A6D60]/50 cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-[#302820] bg-[#302820] text-[#F5F0E8] shadow-sm'
                          : 'border-[#D8C8B5] bg-white text-[#302820] hover:border-[#C5A477] hover:bg-[#FDFBF8]'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C5A477]' : 'text-[#7A6D60]'}`} />
                        <span className="text-xs font-medium tracking-wide">{slot}</span>
                      </div>
                      <div className="text-[10px] mt-1 font-sans">
                        {isBooked ? (
                          <span className="text-red-700/70 tracking-wide">Reserved</span>
                        ) : (
                          <span className="text-[#A98759] tracking-wide">Available</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-[#7A6D60] italic">
                * Slots marked &ldquo;Reserved&rdquo; are already booked by clients. If an existing appointment is cancelled, its slot re-opens immediately.
              </p>
            </div>
          )}

          {/* STEP 5: Customer Details */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#302820] font-light">
                  5. Guest Information
                </h3>
                <p className="text-xs text-[#7A6D60]">
                  Please provide your contact details for appointment confirmation and concierge preparation.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Maya Sen"
                    className={`w-full px-3.5 py-2.5 bg-white border text-sm text-[#302820] focus:outline-none ${
                      formErrors.name
                        ? 'border-red-500'
                        : 'border-[#D8C8B5] focus:border-[#C5A477]'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="maya@example.com"
                      className={`w-full px-3.5 py-2.5 bg-white border text-sm text-[#302820] focus:outline-none ${
                        formErrors.email
                          ? 'border-red-500'
                          : 'border-[#D8C8B5] focus:border-[#C5A477]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3.5 py-2.5 bg-white border text-sm text-[#302820] focus:outline-none ${
                        formErrors.phone
                          ? 'border-red-500'
                          : 'border-[#D8C8B5] focus:border-[#C5A477]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                    Special Preferences or Allergies (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Quiet session requested, sensitive skin, botanical fragrance preferences..."
                    className="w-full px-3.5 py-2 bg-white border border-[#D8C8B5] focus:border-[#C5A477] text-sm text-[#302820] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review Booking Summary */}
          {step === 6 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#302820] font-light">
                  6. Review Your Sanctuary Ritual
                </h3>
                <p className="text-xs text-[#7A6D60]">
                  Please verify your treatment details before confirming the reservation.
                </p>
              </div>

              <div className="bg-white border border-[#C5A477]/50 p-6 space-y-5 shadow-sm relative overflow-hidden">
                <div className="flex items-start justify-between pb-4 border-b border-[#D8C8B5]/60">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#A98759] font-medium">
                      Selected Treatment
                    </span>
                    <h4 className="font-serif text-2xl font-semibold text-[#302820] mt-0.5">
                      {selectedService?.name}
                    </h4>
                    <p className="text-xs text-[#7A6D60] mt-1">{selectedService?.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-serif font-bold tabular-nums text-[#302820]">
                      ₹{selectedService?.price.toLocaleString('en-IN')}
                    </span>
                    <div className="text-xs text-[#7A6D60] mt-0.5">{selectedService?.duration} mins</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs py-2 border-b border-[#D8C8B5]/60">
                  <div>
                    <span className="text-[#7A6D60] block uppercase tracking-wider text-[10px]">
                      Specialist
                    </span>
                    <span className="font-medium text-[#302820] text-sm mt-0.5 block font-serif">
                      {selectedSpecialist?.name}
                    </span>
                    <span className="text-[#7A6D60] text-[11px]">{selectedSpecialist?.role}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6D60] block uppercase tracking-wider text-[10px]">
                      Date & Time
                    </span>
                    <span className="font-medium text-[#302820] text-sm mt-0.5 block">
                      {selectedDate}
                    </span>
                    <span className="text-[#7A6D60] text-[11px]">{selectedSlot}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 py-1">
                  <div className="flex justify-between">
                    <span className="text-[#7A6D60]">Guest Name:</span>
                    <span className="font-medium text-[#302820]">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6D60]">Contact:</span>
                    <span className="font-medium text-[#302820]">
                      {customerPhone} &middot; {customerEmail}
                    </span>
                  </div>
                  {specialRequests && (
                    <div className="flex justify-between pt-1">
                      <span className="text-[#7A6D60]">Notes:</span>
                      <span className="font-medium text-[#302820] italic max-w-xs text-right">
                        {specialRequests}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#D8C8B5]/60 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#302820]">
                    Total Investment
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#302820] tabular-nums">
                    ₹{selectedService?.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#ECE5DA] border border-[#D8C8B5] text-[11px] text-[#7A6D60] leading-relaxed">
                <span className="font-semibold text-[#302820]">Note:</span> This is a portfolio concept reservation. No credit card or prepayment is collected. Your slot will be immediately reserved in demo storage.
              </div>
            </div>
          )}

          {/* STEP 7: Confirmation State */}
          {step === 7 && confirmedBooking && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-18 h-18 bg-[#302820] text-[#C5A477] rounded-full mx-auto flex items-center justify-center shadow-lg border border-[#C5A477]/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A477] font-semibold">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#302820] font-light">
                  Your Moment is Reserved
                </h3>
                <p className="text-xs text-[#7A6D60] max-w-md mx-auto">
                  A concierge confirmation has been scheduled for {confirmedBooking.customerName}.
                </p>
              </div>

              <div className="bg-white border border-[#C5A477] p-6 max-w-md mx-auto text-left space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8C8B5]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6D60]">
                      Booking Reference
                    </span>
                    <div className="font-mono text-xl font-bold tracking-wider text-[#302820]">
                      {confirmedBooking.reference}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6D60]">
                      Status
                    </span>
                    <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                      Confirmed
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#302820]">
                  <div className="flex justify-between">
                    <span className="text-[#7A6D60]">Treatment:</span>
                    <span className="font-medium">{confirmedBooking.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6D60]">Specialist:</span>
                    <span className="font-medium">{confirmedBooking.specialistName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6D60]">Date & Time:</span>
                    <span className="font-medium">
                      {confirmedBooking.date} at {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6D60]">Duration:</span>
                    <span className="font-medium">{confirmedBooking.duration} mins</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#D8C8B5]/60 font-semibold">
                    <span className="text-[#302820]">Total Amount:</span>
                    <span className="tabular-nums font-serif text-base">
                      ₹{confirmedBooking.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadICS}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#302820] text-xs uppercase tracking-wider text-[#302820] hover:bg-[#ECE5DA] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                {onGoToAppointments && (
                  <button
                    onClick={() => {
                      handleCloseAndReset();
                      onGoToAppointments();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#302820] text-xs uppercase tracking-wider text-[#F5F0E8] hover:bg-[#4A3E33] transition-colors shadow-sm"
                  >
                    <span>View in My Appointments</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 7 && (
          <div className="px-7 py-4.5 border-t border-[#D8C8B5] bg-[#ECE5DA]/80 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#7A6D60] hover:text-[#302820] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            <div>
              {step === 1 && (
                <button
                  disabled={!selectedService}
                  onClick={handleNextFromService}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              {step === 2 && (
                <button
                  disabled={!selectedSpecialist}
                  onClick={handleNextFromSpecialist}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest transition-all"
                >
                  <span>Select Date</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              {step === 3 && (
                <button
                  disabled={!selectedDate}
                  onClick={handleNextFromDate}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest transition-all"
                >
                  <span>Choose Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              {step === 4 && (
                <button
                  disabled={!selectedSlot}
                  onClick={handleNextFromSlot}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                >
                  <span>Your Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              {step === 5 && (
                <button
                  onClick={handleNextFromDetails}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest transition-all"
                >
                  <span>Review Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              {step === 6 && (
                <button
                  onClick={handleFinalConfirm}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A477]" />
                  <span>Confirm Reservation</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
