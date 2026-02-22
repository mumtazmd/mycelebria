import React, { createContext, useContext, useState, useEffect } from 'react';
import bookingsData from '../data/bookings.json';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      setBookings(bookingsData.bookings);
      localStorage.setItem('bookings', JSON.stringify(bookingsData.bookings));
    }
  }, []);

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    return newBooking;
  };

  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getVendorBookings = (vendorId) => {
    return bookings.filter(booking => booking.vendorId === vendorId);
  };

  const updateBookingStatus = (bookingId, status) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      createBooking,
      getUserBookings,
      getVendorBookings,
      updateBookingStatus
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);