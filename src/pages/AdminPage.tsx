import React, { useState } from 'react';
import { Booking, BookingStatus } from '../types';
import { updateBookingStatus, resetToDemoData } from '../utils/storage';
import {
  ShieldCheck,
  Search,
  RotateCcw,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  X,
  TrendingUp,
  BarChart3,
  Calendar,
} from 'lucide-react';

interface AdminPageProps {
  bookings: Booking[];
  onRefreshBookings: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  bookings,
  onRefreshBookings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Compute KPI metrics
  const totalBookings = bookings.length;
  const upcomingCount = bookings.filter((b) => b.status === 'upcoming').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;

  const totalEstimatedRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.price, 0);

  // Category breakdown for luxury visual chart
  const categories = ['skincare', 'hair', 'wellness', 'occasions'] as const;
  const categoryCounts = categories.map((cat) => ({
    cat,
    label: cat === 'skincare' ? 'Skincare' : cat === 'hair' ? 'Hair Care' : cat === 'wellness' ? 'Wellness' : 'Occasions',
    count: bookings.filter((b) => b.category === cat).length,
    percentage: totalBookings > 0 ? Math.round((bookings.filter((b) => b.category === cat).length / totalBookings) * 100) : 0,
  }));

  // Filter bookings table
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      b.customerName.toLowerCase().includes(query) ||
      b.reference.toLowerCase().includes(query) ||
      b.serviceName.toLowerCase().includes(query) ||
      b.customerPhone.toLowerCase().includes(query) ||
      b.specialistName.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  const handleUpdateStatus = (id: string, newStatus: BookingStatus, ref: string) => {
    updateBookingStatus(id, newStatus);
    onRefreshBookings();
    setActionSuccessMessage(`Updated appointment ${ref} to ${newStatus}.`);
    setTimeout(() => setActionSuccessMessage(null), 3000);
    if (selectedBookingForDetails?.id === id) {
      setSelectedBookingForDetails((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo appointments to initial sample states?')) {
      resetToDemoData();
      onRefreshBookings();
      setSelectedBookingForDetails(null);
      setActionSuccessMessage('Demo appointments database successfully reset.');
      setTimeout(() => setActionSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-18 space-y-10">
      {/* Demo Admin Notification Banner */}
      <div className="p-5 bg-[#302820] text-[#F5F0E8] border border-[#C5A477]/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C5A477] shrink-0" />
          <div className="text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#C5A477]">
              Studio Concierge & Admin Console (Demo Mode)
            </span>
            <p className="text-[#D8C8B5]/80 mt-0.5">
              Client-side administrative simulator for staff to manage reservations, check real-time availability, and update appointment states.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetData}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#C5A477]/50 hover:bg-[#4A3E33] text-[11px] uppercase tracking-wider text-[#D8C8B5] transition-colors shrink-0 shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C5A477]" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {actionSuccessMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in shadow-xs">
          <span>{actionSuccessMessage}</span>
          <button onClick={() => setActionSuccessMessage(null)}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-6 glass-panel border border-[#D8C8B5]">
          <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block font-medium">
            Total Bookings
          </span>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#302820] mt-1 tabular-nums">
            {totalBookings}
          </div>
        </div>

        <div className="p-6 glass-panel border border-[#D8C8B5]">
          <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block font-medium">
            Upcoming
          </span>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-800 mt-1 tabular-nums">
            {upcomingCount}
          </div>
        </div>

        <div className="p-6 glass-panel border border-[#D8C8B5]">
          <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block font-medium">
            Completed
          </span>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#7A6D60] mt-1 tabular-nums">
            {completedCount}
          </div>
        </div>

        <div className="p-6 glass-panel border border-[#D8C8B5]">
          <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block font-medium">
            Cancelled
          </span>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-red-700 mt-1 tabular-nums">
            {cancelledCount}
          </div>
        </div>

        <div className="p-6 glass-panel border border-[#D8C8B5] col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase tracking-wider text-[#7A6D60] block font-medium">
            Active Value
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#302820] mt-1 tabular-nums">
            ₹{totalEstimatedRevenue.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Visual Distribution Bar */}
      <div className="p-6 glass-panel border border-[#D8C8B5] space-y-3">
        <div className="flex items-center justify-between text-xs text-[#7A6D60]">
          <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5 text-[#302820]">
            <BarChart3 className="w-3.5 h-3.5 text-[#C5A477]" />
            <span>Category Booking Distribution</span>
          </span>
          <span>{totalBookings} total sessions recorded</span>
        </div>

        <div className="w-full h-3 bg-[#D8C8B5]/40 rounded-full overflow-hidden flex">
          <div style={{ width: `${categoryCounts[0].percentage}%` }} className="bg-[#302820] h-full" title="Skincare" />
          <div style={{ width: `${categoryCounts[1].percentage}%` }} className="bg-[#C5A477] h-full" title="Hair Care" />
          <div style={{ width: `${categoryCounts[2].percentage}%` }} className="bg-[#A98759] h-full" title="Wellness" />
          <div style={{ width: `${categoryCounts[3].percentage}%` }} className="bg-[#7A6D60] h-full" title="Occasions" />
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs text-[#7A6D60] pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#302820]" />
            <span>Skincare ({categoryCounts[0].percentage}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A477]" />
            <span>Hair Care ({categoryCounts[1].percentage}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A98759]" />
            <span>Wellness ({categoryCounts[2].percentage}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A6D60]" />
            <span>Occasions ({categoryCounts[3].percentage}%)</span>
          </div>
        </div>
      </div>

      {/* Table Filters & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#7A6D60] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by guest name, ref (e.g. AURA-), phone, or service..."
              className="w-full pl-9 pr-4 py-2.5 glass-panel border border-[#D8C8B5] text-xs text-[#302820] focus:outline-none focus:border-[#C5A477]"
            />
          </div>

          {/* Status Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((st) => {
              const isSelected = statusFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium border transition-colors ${
                    isSelected
                      ? 'bg-[#302820] text-[#F5F0E8] border-[#302820] shadow-sm'
                      : 'glass-panel text-[#7A6D60] border-[#D8C8B5] hover:text-[#302820]'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appointments Table */}
        <div className="glass-panel border border-[#D8C8B5] overflow-x-auto shadow-md">
          <table className="w-full text-left text-xs text-[#302820] border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#ECE5DA]/80 border-b border-[#D8C8B5] text-[11px] uppercase tracking-wider text-[#7A6D60]">
                <th className="py-3.5 px-4 font-semibold">Reference</th>
                <th className="py-3.5 px-4 font-semibold">Guest</th>
                <th className="py-3.5 px-4 font-semibold">Treatment</th>
                <th className="py-3.5 px-4 font-semibold">Date & Time</th>
                <th className="py-3.5 px-4 font-semibold">Specialist</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C8B5]/60 bg-white/70">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#7A6D60]">
                    No appointments matched your query.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF6EE] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#302820]">
                      {b.reference}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#302820]">{b.customerName}</div>
                      <div className="text-[11px] text-[#7A6D60]">{b.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-serif text-sm font-semibold">{b.serviceName}</div>
                      <div className="text-[11px] text-[#7A6D60]">{b.duration} mins</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium">{b.date}</div>
                      <div className="text-[11px] text-[#7A6D60]">{b.timeSlot}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#7A6D60]">{b.specialistName}</td>
                    <td className="py-3.5 px-4 font-bold tabular-nums font-serif text-sm">
                      ₹{b.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] uppercase tracking-wider font-semibold ${
                          b.status === 'upcoming'
                            ? 'text-emerald-800'
                            : b.status === 'completed'
                            ? 'text-[#7A6D60]'
                            : 'text-red-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBookingForDetails(b)}
                          title="View Details"
                          className="p-1.5 text-[#7A6D60] hover:text-[#302820] hover:bg-[#ECE5DA] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {b.status === 'upcoming' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'completed', b.reference)}
                              title="Mark as Completed"
                              className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white text-[10px] uppercase tracking-wider transition-colors"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'cancelled', b.reference)}
                              title="Cancel & Free Slot"
                              className="px-2.5 py-1 border border-red-300 text-red-700 hover:bg-red-50 text-[10px] uppercase tracking-wider transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {b.status === 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, 'upcoming', b.reference)}
                            title="Re-open as Upcoming"
                            className="px-2.5 py-1 border border-[#302820] text-[#302820] hover:bg-[#ECE5DA] text-[10px] uppercase tracking-wider transition-colors"
                          >
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guest Details Modal */}
      {selectedBookingForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#302820]/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#F5F0E8] border border-[#C5A477]/50 max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8C8B5]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6D60]">
                  Booking Reference
                </span>
                <h3 className="font-mono text-xl font-bold text-[#302820]">
                  {selectedBookingForDetails.reference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingForDetails(null)}
                className="p-1 text-[#7A6D60] hover:text-[#302820]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#302820]">
              <div className="p-3.5 bg-white border border-[#D8C8B5] space-y-1.5 shadow-xs">
                <div className="text-[10px] uppercase tracking-wider text-[#A98759] font-medium">
                  Guest Profile
                </div>
                <div className="font-semibold text-sm">{selectedBookingForDetails.customerName}</div>
                <div className="flex items-center gap-2 text-[#7A6D60]">
                  <Phone className="w-3.5 h-3.5 text-[#C5A477]" />
                  <span>{selectedBookingForDetails.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#7A6D60]">
                  <Mail className="w-3.5 h-3.5 text-[#C5A477]" />
                  <span>{selectedBookingForDetails.customerEmail}</span>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-[#D8C8B5] space-y-1.5 shadow-xs">
                <div className="text-[10px] uppercase tracking-wider text-[#A98759] font-medium">
                  Treatment Details
                </div>
                <div className="font-serif text-base font-semibold">
                  {selectedBookingForDetails.serviceName}
                </div>
                <div className="flex justify-between text-[#7A6D60]">
                  <span>Specialist:</span>
                  <span className="font-medium text-[#302820]">
                    {selectedBookingForDetails.specialistName}
                  </span>
                </div>
                <div className="flex justify-between text-[#7A6D60]">
                  <span>Date & Time:</span>
                  <span className="font-medium text-[#302820]">
                    {selectedBookingForDetails.date} at {selectedBookingForDetails.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between text-[#7A6D60]">
                  <span>Duration:</span>
                  <span className="font-medium text-[#302820]">
                    {selectedBookingForDetails.duration} minutes
                  </span>
                </div>
                <div className="flex justify-between text-[#7A6D60] pt-1.5 border-t border-[#D8C8B5]/50">
                  <span className="font-semibold text-[#302820]">Amount:</span>
                  <span className="font-serif text-base font-bold tabular-nums text-[#302820]">
                    ₹{selectedBookingForDetails.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {selectedBookingForDetails.specialRequests && (
                <div className="p-3 bg-[#FAF6EE] border border-[#D8C8B5] space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#A98759] font-semibold">
                    Guest Preferences & Allergies
                  </div>
                  <p className="text-xs italic text-[#7A6D60]">
                    &ldquo;{selectedBookingForDetails.specialRequests}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-[#D8C8B5]">
              <span className="text-xs uppercase tracking-wider font-semibold">
                Status:{' '}
                <span className="text-[#C5A477]">{selectedBookingForDetails.status}</span>
              </span>

              <div className="flex items-center gap-2">
                {selectedBookingForDetails.status === 'upcoming' && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        selectedBookingForDetails.id,
                        'completed',
                        selectedBookingForDetails.reference
                      )
                    }
                    className="px-3.5 py-1.5 bg-emerald-800 text-white text-xs uppercase tracking-wider hover:bg-emerald-900 transition-colors"
                  >
                    Mark Completed
                  </button>
                )}
                {selectedBookingForDetails.status === 'upcoming' && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        selectedBookingForDetails.id,
                        'cancelled',
                        selectedBookingForDetails.reference
                      )
                    }
                    className="px-3.5 py-1.5 border border-red-300 text-red-700 text-xs uppercase tracking-wider hover:bg-red-50 transition-colors"
                  >
                    Cancel Booking
                  </button>
                )}
                <button
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="px-3.5 py-1.5 border border-[#D8C8B5] text-xs uppercase tracking-wider text-[#7A6D60]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
