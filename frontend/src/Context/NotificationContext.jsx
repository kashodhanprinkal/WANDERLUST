import { createContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Ensure backend API is hit, not Vite dev server
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notification");
      const data = res.data;

      if (!Array.isArray(data)) {
        throw new Error(`Expected notifications array, got: ${JSON.stringify(data)}`);
      }

      setNotifications(data);
      const unread = data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("❌ Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notification/${id}/read`);
      fetchNotifications();
    } catch (error) {
      console.error("❌ Error marking as read", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
