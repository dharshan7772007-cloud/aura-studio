import React, { useState, useEffect } from 'react';
import { PageView, Booking } from './types';
import { getBookings } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RitualMatchPage } from './pages/RitualMatchPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedSpecialistId, setPreselectedSpecialistId] = useState<string | undefined>();

  // Load bookings from storage on mount
  const refreshBookings = () => {
    const list = getBookings();
    setBookings(list);
  };

  useEffect(() => {
    refreshBookings();

    // Check URL hash if present
    const hash = window.location.hash.replace('#', '') as PageView;
    if (['home', 'services', 'ritual-match', 'my-appointments', 'about', 'contact', 'admin'].includes(hash)) {
      setCurrentPage(hash);
    }
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceAndBook = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedSpecialistId(undefined);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingModal = () => {
    setPreselectedServiceId(undefined);
    setPreselectedSpecialistId(undefined);
    setIsBookingModalOpen(true);
  };

  const upcomingCount = bookings.filter((b) => b.status === 'upcoming').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#302820]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBookingModal={handleOpenBookingModal}
        upcomingCount={upcomingCount}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectServiceAndBook={handleSelectServiceAndBook}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onSelectServiceAndBook={handleSelectServiceAndBook}
            onOpenRitualMatch={() => handleNavigate('ritual-match')}
          />
        )}

        {currentPage === 'ritual-match' && (
          <RitualMatchPage onSelectServiceAndBook={handleSelectServiceAndBook} />
        )}

        {currentPage === 'my-appointments' && (
          <MyAppointmentsPage
            bookings={bookings}
            onRefreshBookings={refreshBookings}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onOpenBookingModal={handleOpenBookingModal} />
        )}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'admin' && (
          <AdminPage
            bookings={bookings}
            onRefreshBookings={refreshBookings}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedSpecialistId={preselectedSpecialistId}
        onBookingSuccess={() => {
          refreshBookings();
        }}
        onGoToAppointments={() => {
          setIsBookingModalOpen(false);
          handleNavigate('my-appointments');
        }}
      />
    </div>
  );
}
