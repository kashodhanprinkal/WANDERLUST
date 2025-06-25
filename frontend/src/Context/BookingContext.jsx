// src/Context/BookingContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import { ListingDataContext } from './ListingContext';

export const bookingDataContext = createContext();

function BookingContext({ children }) {
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);
  const [night, setNight] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { userData, reloadUser: fetchCurrentUser } = useContext(userDataContext);
  const { getListing } = useContext(ListingDataContext);

  const [unavailableDates, setUnavailableDates] = useState([]);


  // ✅ Create Booking
  const handleBooking = async (id) => {
    try {
      setBookingLoading(true);
      setBookingStatus(null);

      if (!userData?._id) {
        setBookingStatus("error");
        return;
      }

      const res = await axios.post(
        `${serverUrl}/api/booking/create/${id}`,
        { checkIn, checkOut, totalRent: total },
        { withCredentials: true }
      );

      await fetchCurrentUser();
      setBookingData(res.data);
      setBookingStatus("success");
    } catch (error) {
      console.error("❌ Booking Error:", error.response?.data || error.message);
      setBookingStatus("error");
    } finally {
      setBookingLoading(false);
    }
  };

  // ❌ Cancel Booking
  const cancelBooking = async (id) => {
    try {
      const res = await axios.delete(`${serverUrl}/api/booking/cancel/${id}`, {
        withCredentials: true
      });
      await fetchCurrentUser();
      console.log("❌ Booking Cancelled:", res.data);
    } catch (error) {
      console.error("❌ Cancel Error:", error.response?.data || error.message);
    }
  };

  // ✅ Auto-update done bookings
  const updateBookingStatusIfDone = async () => {
    try {
      const res = await axios.put(`${serverUrl}/api/booking/update-statuses`, {}, {
        withCredentials: true,
      });
      await fetchCurrentUser();
    } catch (error) {
      console.error("❌ Update status failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    updateBookingStatusIfDone();
  }, []);

  // ✅ Check if user has booked this listing (but not cancelled or done)
  const isListingBookedByUser = (listingId) => {
    if (!userData?.booking) return false;

    return userData.booking.some(
      (booking) =>
        booking?.listing?._id === listingId &&
        booking?.status === "booked"
    );
  };

  const fetchUnavailableDates = async (listingId) => {
  try {
    const res = await axios.get(`${serverUrl}/api/booking/unavailable-dates/${listingId}`, {
      withCredentials: true,
    });
    if (Array.isArray(res.data)) {
      setUnavailableDates(res.data);
    } else {
      console.error("Unexpected unavailable dates format:", res.data);
    }
  } catch (error) {
    console.error("❌ Failed to fetch unavailable dates:", error.response?.data || error.message);
  }
};


  const value = {
    checkIn, setcheckIn,
    checkOut, setCheckOut,
    total, setTotal,
    night, setNight,
    handleBooking,
    bookingData, setBookingData,
    bookingStatus, setBookingStatus,
    bookingLoading,
    cancelBooking,
    updateBookingStatusIfDone,
    isListingBookedByUser,
      unavailableDates,
  fetchUnavailableDates,
  };

  return (
    <bookingDataContext.Provider value={value}>
      {children}
    </bookingDataContext.Provider>
  );
}

export default BookingContext;
