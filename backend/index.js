import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRouter from "./routes/user.route.js";
import ListingRouter from "./routes/listing.route.js";
import bookingRouter from "./routes/booking.route.js";
import reviewRouter from './routes/review.route.js';
import geocodeRouter from "./routes/geocode.route.js";




dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", ListingRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/review", reviewRouter);
app.use("/api/geocode", geocodeRouter);

app.get("/", (req, res) => {
  res.send("Hello from Prinkal");
});

// Connect DB, then start server
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("❌ Could not start server:", err.message);
});
