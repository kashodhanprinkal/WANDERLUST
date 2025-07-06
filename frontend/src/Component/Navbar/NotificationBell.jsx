import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/Notifications")}
      className="relative p-2"
    >
      <Bell size={24} />
     
    </button>
  );
};

export default NotificationBell;
