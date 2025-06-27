import React from 'react';
import toast from 'react-hot-toast';

const ViewBooking = ({ listing, bookings, onClose, onCancel }) => {
  const getStatusBadge = (status) => {
    const badgeStyles = {
      booked: 'bg-blue-100 text-blue-700',
      done: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-600',
    };

    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
          badgeStyles[status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          📄 Bookings for <span className="text-blue-600">{listing.title}</span>
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-gray-50 p-4 rounded border border-gray-200"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{b.guest.name}</span>
                  {getStatusBadge(b.status)}
                </div>

                <p className="text-sm text-gray-500">📧 {b.guest.email}</p>
                <p>
                  <strong>Check-in:</strong>{' '}
                  {new Date(b.checkIn).toLocaleDateString()}
                </p>
                <p>
                  <strong>Check-out:</strong>{' '}
                  {new Date(b.checkOut).toLocaleDateString()}
                </p>

                {b.rating && (
                  <div className="mt-1">
                    <p className="text-yellow-600 font-medium">
                      ⭐ {b.rating} / 5
                    </p>
                    {b.review && (
                      <p className="italic text-sm mt-1 text-gray-600">
                        "{b.review}"
                      </p>
                    )}
                  </div>
                )}

                {b.status === 'cancelled' ? (
                  <p className="text-red-600 mt-1 font-medium">
                    ❌ Cancelled by {b.cancelledBy}
                  </p>
                ) : new Date() < new Date(b.checkIn) ? (
                  <button
                    onClick={() => onCancel(b._id, b.checkIn)}
                    className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600 text-sm"
                  >
                    Cancel Booking
                  </button>
                ) : (
                  <p className="text-xs italic text-gray-400 mt-1">
                    Too late to cancel
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooking;
