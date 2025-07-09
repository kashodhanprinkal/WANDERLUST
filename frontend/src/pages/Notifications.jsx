import React, { useContext, useEffect } from "react";
import { NotificationContext } from "../Context/NotificationContext";

const Notifications = () => {
  const {
    notifications,
    loading,
    fetchNotifications,
    markAsRead,
  } = useContext(NotificationContext);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔔 Notifications</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-5">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-5 border rounded-lg shadow-sm flex gap-4 ${
                n.isRead ? "bg-gray-100" : "bg-white"
              }`}
            >
              {/* Avatar */}
              <div className="min-w-[50px]">
                <img
                  src={n.sender?.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border"
                />
              </div>

              {/* Notification content */}
              <div className="flex-1 space-y-1">
                {/* Message */}
                <p className="font-semibold text-gray-800">
                  {n.sender?.name || "System"} → {n.message}
                </p>

                {/* Listing title */}
                {n.listing?.title && (
                  <p className="text-sm font-bold text-blue-700 mt-1">
                    Listing: {n.listing.title}
                  </p>
                )}

                {/* Location */}
                {(n.listing?.landmark ||
                  n.listing?.city ||
                  n.listing?.state ||
                  n.listing?.country) && (
                  <p className="text-sm text-gray-600">
                    📍{" "}
                    {[
                      n.listing?.landmark,
                      n.listing?.city,
                      n.listing?.state,
                      n.listing?.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}

                {/* Timestamp */}
                <p className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Mark as read */}
              {!n.isRead && (
                <button
                  className="self-start mt-1 text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => markAsRead(n._id)}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
