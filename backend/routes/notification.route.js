// routes/notification.routes.js
import express from "express";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controller/notification.controller.js";
import isAuth from "../middleware/isAuth.js";

const notificationRouter = express.Router();
notificationRouter.use(isAuth); // ✅ Authentication middleware

notificationRouter.get("/", getMyNotifications);
notificationRouter.patch("/:id/read", markAsRead);
notificationRouter.patch("/read-all", markAllAsRead);
notificationRouter.delete("/:id", deleteNotification);

export default notificationRouter;
