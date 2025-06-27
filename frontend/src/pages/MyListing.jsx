import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { userDataContext } from '../Context/UserContext';
import ViewBooking from '../component/ViewBooking';

function MyListing() {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const [hostBookings, setHostBookings] = useState([]);
  const [popupInfo, setPopupInfo] = useState({ show: false, listing: null, bookings: [] });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/booking/host', {
          withCredentials: true,
        });
        setHostBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Booking fetch error:', err);
        toast.error("Failed to fetch host bookings");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId, checkInDate) => {
    if (new Date() > new Date(checkInDate)) {
      return toast.error('❌ Cannot cancel after check-in date');
    }

    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/booking/cancel/${bookingId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);

      setHostBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: 'cancelled', cancelledBy: 'host' } : b
        )
      );
    } catch (err) {
      toast.error('Cancellation failed');
    }
  };

  const openPopup = (listing) => {
    const bookings = hostBookings.filter((b) => {
      const bookingListingId = typeof b.listing === 'string' ? b.listing : b.listing?._id;
      return bookingListingId?.toString() === listing._id.toString();
    });

    setPopupInfo({ show: true, listing, bookings });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 pb-16 pt-6">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg"
      >
        <FaArrowLeft />
      </button>

      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🏠 Your Listings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.listing?.map((list) => (
          <div
            key={list._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-44">
              <img
                src={list.image1}
                alt={list.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-40 text-white p-2 w-full text-sm font-semibold">
                {list.title} - {list.city}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <p className="text-gray-600 text-sm">₹{list.rent} per night</p>
              <p className="text-sm text-gray-500">{list.category}</p>
              <p className="text-xs text-gray-400">{list.landmark}</p>

              <button
                onClick={() => openPopup(list)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded mt-3"
              >
                View Guest Bookings
              </button>
            </div>
          </div>
        ))}
      </div>

      {popupInfo.show && (
        <ViewBooking
          listing={popupInfo.listing}
          bookings={popupInfo.bookings}
          onClose={() => setPopupInfo({ show: false, listing: null, bookings: [] })}
          onCancel={handleCancelBooking}
        />
      )}
    </div>
  );
}

export default MyListing;
