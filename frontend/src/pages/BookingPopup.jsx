import React, { useContext, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { TbXboxX } from "react-icons/tb";
import { addDays, differenceInDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { bookingDataContext } from "../Context/BookingContext";

const BookingPopup = ({ cardDetails, onClose }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const {
    checkIn, setcheckIn,
    checkOut, setCheckOut,
    total, setTotal,
    night, setNight,
    handleBooking,
    bookingStatus, setBookingStatus,
    bookingLoading
  } = useContext(bookingDataContext);

  const pricePerNight = cardDetails?.rent || 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setBookingStatus(null); // Reset message on popup open
  }, []);

  useEffect(() => {
    const startDate = range[0].startDate;
    const endDate = range[0].endDate;

    setcheckIn(startDate);
    setCheckOut(endDate);

    const nights = differenceInDays(endDate, startDate);
    setNight(nights);

    const airbnbCharge = pricePerNight * 0.07;
    const tax = pricePerNight * 0.18;

    if (nights > 0) {
      setTotal((pricePerNight * nights) + airbnbCharge + tax);
    } else {
      setTotal(0);
    }
  }, [range, pricePerNight]);

  const checkInDate = checkIn ? format(new Date(checkIn), "dd MMM yyyy") : "";
  const checkOutDate = checkOut ? format(new Date(checkOut), "dd MMM yyyy") : "";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-red-600 text-white p-1.5 rounded-full hover:scale-110 transition"
          onClick={onClose}
          aria-label="Close booking popup"
        >
          <TbXboxX className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Your Trip to <span className="text-red-600 capitalize">{cardDetails?.city || "Unknown"}</span>
          </h2>
          <p className="text-sm text-gray-500 capitalize">{cardDetails?.title || "Listing Name"}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBooking(cardDetails._id);
          }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Date Picker */}
            <div className="flex-1">
              <DateRange
                ranges={range}
                onChange={(item) => setRange([item.selection])}
                minDate={new Date()}
                rangeColors={["#EF4444"]}
                editableDateInputs={true}
              />
              <button
                type="submit"
                disabled={bookingLoading}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>

              {/* Booking result message */}
              {bookingStatus === "success" && (
                <p className="text-green-600 text-sm mt-3 font-medium">✅ Booking successful!</p>
              )}
              {bookingStatus === "error" && (
                <p className="text-red-600 text-sm mt-3 font-medium">❌ Failed to book. Try again.</p>
              )}
            </div>

            {/* Booking Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Check-in/Check-out */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">CHECK-IN</p>
                    <p className="font-semibold">{checkInDate}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">CHECK-OUT</p>
                    <p className="font-semibold">{checkOutDate}</p>
                  </div>
                </div>

                {/* Price and Nights */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 text-sm">Price per night</p>
                    <p className="text-lg font-semibold">₹{pricePerNight.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">TOTAL NIGHTS</p>
                    <p className="font-semibold">{night} night{night !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                {/* Charges */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Base Price</span>
                    <span>₹{(pricePerNight * night).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Airbnb Service Fee (7%)</span>
                    <span>₹{Math.round(pricePerNight * 0.07).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>GST Tax (18%)</span>
                    <span>₹{Math.round(pricePerNight * 0.18).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-medium">Total <br />(incl. all charges)</p>
                  <p className="text-lg font-bold text-green-600">₹{total.toLocaleString()}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">No extra or hidden charges.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
