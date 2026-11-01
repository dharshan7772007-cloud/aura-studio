import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Send, Car, Navigation } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Sanctuary Inquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please provide your full name';
    if (!email.trim()) newErrors.email = 'Please provide your email address';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please provide a valid email format';
    if (!message.trim()) newErrors.message = 'Please share your inquiry or message';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A6D60] font-semibold">
          Concierge & Location
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#302820] font-light">
          Connect With Our Sanctuary
        </h1>
        <p className="text-sm sm:text-base text-[#7A6D60] leading-relaxed">
          Whether you wish to arrange a private bridal party sanctuary buyout, discuss bespoke sensitivities, or seek directional assistance, our concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white border border-[#D8C8B5] p-6 sm:p-10 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-[#302820] text-[#C5A477] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#302820]">Message Received</h3>
              <p className="text-xs sm:text-sm text-[#7A6D60] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#302820]">{name}</strong>. Our head concierge has received your note and will respond to <strong className="text-[#302820]">{email}</strong> within four business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-[#302820] text-xs uppercase tracking-wider text-[#F5F0E8] hover:bg-[#4A3E33]"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1 pb-2 border-b border-[#D8C8B5]/60">
                <h3 className="font-serif text-2xl text-[#302820]">Send a Message</h3>
                <p className="text-xs text-[#7A6D60]">
                  Our concierge answers queries regarding customized rituals and private chamber arrangements.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sanya Kapoor"
                  className={`w-full px-3.5 py-2.5 bg-[#FDFBF9] border text-xs text-[#302820] focus:outline-none ${
                    errors.name ? 'border-red-500' : 'border-[#D8C8B5] focus:border-[#C5A477]'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sanya@example.com"
                    className={`w-full px-3.5 py-2.5 bg-[#FDFBF9] border text-xs text-[#302820] focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-[#D8C8B5] focus:border-[#C5A477]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF9] border border-[#D8C8B5] focus:border-[#C5A477] text-xs text-[#302820] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF9] border border-[#D8C8B5] focus:border-[#C5A477] text-xs text-[#302820] focus:outline-none"
                >
                  <option value="General Sanctuary Inquiry">General Sanctuary Inquiry</option>
                  <option value="Bridal Suite & Group Bookings">Bridal Suite & Group Bookings</option>
                  <option value="Product Sensitivity Consultation">Product Sensitivity Consultation</option>
                  <option value="Editorial & Press">Editorial & Press</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7A6D60] mb-1">
                  Your Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How may our concierge assist your visit?"
                  className={`w-full px-3.5 py-2.5 bg-[#FDFBF9] border text-xs text-[#302820] focus:outline-none ${
                    errors.message ? 'border-red-500' : 'border-[#D8C8B5] focus:border-[#C5A477]'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#302820] hover:bg-[#4A3E33] text-[#F5F0E8] text-xs uppercase tracking-widest font-semibold transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A477]" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Studio Info & Map Details */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Details Box */}
          <div className="bg-white border border-[#D8C8B5] p-6 space-y-6">
            <h3 className="font-serif text-2xl text-[#302820] pb-3 border-b border-[#D8C8B5]/60">
              Sanctuary Details
            </h3>

            <div className="space-y-4 text-xs text-[#7A6D60]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A477] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#302820] block text-sm font-serif">AURA Studio</strong>
                  <span className="leading-relaxed block mt-0.5">
                    Pavilion Court, 42 Magnolia Lane,
                    <br />
                    Indiranagar, Bengaluru 560038
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A477] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#302820] block font-medium">Concierge Line</strong>
                  <span>+91 80 4920 7800</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C5A477] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#302820] block font-medium">Electronic Inquiries</strong>
                  <span>concierge@aurastudio.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A477] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#302820] block font-medium">Operating Hours</strong>
                  <span className="block">Mon – Sat: 9:30 AM – 8:30 PM</span>
                  <span className="block text-[#A98759]">Sunday Rituals: 10:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Map & Arrival Guidance */}
          <div className="bg-[#ECE5DA] border border-[#D8C8B5] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#7A6D60] font-semibold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#C5A477]" />
                <span>Arrival & Valet</span>
              </span>
              <span className="text-[10px] text-[#A98759] uppercase tracking-wider font-medium">
                Demo Map
              </span>
            </div>

            {/* Stylized Map Vector */}
            <div className="aspect-[16/9] bg-[#E4DDD1] border border-[#D8C8B5] relative overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 225" fill="none">
                <rect width="400" height="225" fill="#E2D9CC" />
                {/* Street Grid */}
                <path d="M0 60 L400 60" stroke="#D3C7B6" strokeWidth="8" />
                <path d="M0 160 L400 160" stroke="#D3C7B6" strokeWidth="12" />
                <path d="M120 0 L120 225" stroke="#D3C7B6" strokeWidth="10" />
                <path d="M280 0 L280 225" stroke="#D3C7B6" strokeWidth="8" />
                {/* Magnolia Lane street label */}
                <text x="200" y="156" fill="#7A6D60" fontSize="9" letterSpacing="2" fontFamily="sans-serif">
                  MAGNOLIA LANE
                </text>
                {/* Studio Pin Marker */}
                <circle cx="210" cy="110" r="16" fill="#302820" />
                <circle cx="210" cy="110" r="6" fill="#C5A477" />
                <circle cx="210" cy="110" r="28" stroke="#C5A477" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <rect x="160" y="70" width="100" height="22" fill="#FAF6EE" stroke="#302820" strokeWidth="1" />
                <text x="210" y="85" textAnchor="middle" fill="#302820" fontSize="10" fontWeight="bold" fontFamily="'Cormorant Garamond', Georgia, serif">
                  AURA STUDIO
                </text>
              </svg>
            </div>

            <div className="space-y-2 text-xs text-[#7A6D60]">
              <div className="flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-[#C5A477]" />
                <span>Complimentary valet parking available at the Pavilion Court entrance.</span>
              </div>
              <p className="text-[11px] italic">
                * Please arrive 15 minutes prior to your scheduled time slot to enjoy your welcome herbal tea infusion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
