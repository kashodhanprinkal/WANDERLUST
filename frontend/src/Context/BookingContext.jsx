import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import { ListingDataContext } from './ListingContext';

// Context for booking operations
export const bookingDataContext = createContext();

function BookingContext({ children }) {
  // Booking form states
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);
  const [night, setNight] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null); // 'success' or 'error'
  const [bookingLoading, setBookingLoading] = useState(false);

  // App context
  const { serverUrl } = useContext(authDataContext);
  const { userData, reloadUser: fetchCurrentUser } = useContext(userDataContext);
  const { getListing } = useContext(ListingDataContext);

  // 🔵 Booking a listing
  const handleBooking = async (id) => {
    try {
      setBookingLoading(true);
      setBookingStatus(null);

      if (!userData?._id) {
        console.error("User is not logged in");
        setBookingStatus("error");
        return;
      }

      const result = await axios.post(
        `${serverUrl}/api/booking/create/${id}`,
        { checkIn, checkOut, totalRent: total },
        { withCredentials: true }
      );

      console.log("✅ Booking result:", result.data);
      await fetchCurrentUser();
      setBookingData(result.data);
      setBookingStatus("success");
    } catch (error) {
      console.error("❌ Booking failed:", error.response?.data || error.message);
      setBookingData(null);
      setBookingStatus("error");
    } finally {
      setBookingLoading(false);
    }
  };

  // 🔴 Cancel a booking (host only)
  const cancelBooking = async (id) => {
    try {
      const result = await axios.delete(`${serverUrl}/api/booking/cancel/${id}`, {
        withCredentials: true
      });
      await fetchCurrentUser();
      console.log("❌ Booking cancelled:", result.data);
    } catch (error) {
      console.error("⚠️ Cancel error:", error.response?.data || error.message);
    }
  };

  // ✅ Automatically mark bookings as "done" after checkout
  const updateBookingStatusIfDone = async () => {
    try {
      const result = await axios.put(`${serverUrl}/api/booking/update-statuses`, {}, { withCredentials: true });

      console.log("📦 Booking status check complete:", result.data);
      await fetchCurrentUser(); // Refresh user data with updated statuses
    } catch (error) {
      console.error("⚠️ Status update failed:", error.response?.data || error.message);
    }
  };

  // Optionally run once when component mounts
  useEffect(() => {
    updateBookingStatusIfDone();
  }, []);

  // Context values exposed to all children
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
    updateBookingStatusIfDone, // expose status checker
  };

  return (
    <bookingDataContext.Provider value={value}>
      {children}
    </bookingDataContext.Provider>
  );
}

export default BookingContext;
