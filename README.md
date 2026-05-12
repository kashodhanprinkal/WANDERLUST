Here is your **COMPLETE, polished, recruiter-ready README.md** for your Wanderlust project — fully structured, clean, with logos, env setup, UX points, tech stack tables, and professional tone.

---

# 🌍 Wanderlust – MERN Travel & Hotel Booking Platform

<div align="center">

## ✨ Explore • Book • Stay • Experience

A full-stack **travel & hotel booking platform** built using the **MERN stack**, enabling users to discover stays, book accommodations, manage listings, upload images, and explore locations through interactive maps.

---

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge\&logo=react)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge\&logo=jsonwebtokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Upload-blue?style=for-the-badge)

</div>

---

# 🌐 Live Demo

🚀 **Live Project:**
👉 [https://wanderlust-miim.onrender.com](https://wanderlust-miim.onrender.com)

---

# 📌 Project Overview

**Wanderlust** is a production-ready full-stack web application inspired by Airbnb.

It allows users to:

* Browse travel listings 🏨
* Book stays 📦
* Create & manage properties 🏠
* Upload images 📷
* View locations on maps 🌍
* Receive email confirmations 📧

Built with **MVC architecture + REST APIs + Cloud integration**, making it scalable and production-ready.

---

# 🧠 Key Highlights

✔ Full Stack MERN Application
✔ Real-world booking system
✔ Secure authentication (JWT)
✔ Cloud image storage (Cloudinary)
✔ Interactive maps (Leaflet)
✔ Responsive UI (Tailwind CSS)
✔ Email automation system
✔ Scalable backend architecture

---

# 🧠 Tech Stack

---

## 🎨 Frontend (UI Layer)

| Logo                                                                                  | Technology    | Used In  | Why Used                                              |
| ------------------------------------------------------------------------------------- | ------------- | -------- | ----------------------------------------------------- |
| ![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg) | React.js      | Frontend | Builds fast, reusable UI components using Virtual DOM |
| ![Vite](https://vitejs.dev/logo.svg)                                                  | Vite          | Frontend | Lightning-fast development server with hot reload     |
| ![Tailwind](https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg)       | Tailwind CSS  | Frontend | Utility-first CSS for modern responsive UI            |
| ![Router](https://reactrouter.com/favicon-light.png)                                  | React Router  | Frontend | Enables smooth SPA navigation                         |
| ![Axios](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg)    | Axios         | Frontend | Handles API requests efficiently                      |
| ![Leaflet](https://leafletjs.com/docs/images/logo.png)                                | React Leaflet | Frontend | Interactive maps for location-based features          |
| ![Toast](https://react-hot-toast.com/favicon.ico)                                     | React Toast   | Frontend | Real-time user notifications                          |

---

## ⚙️ Backend (Server Layer)

| Logo                                                                                        | Technology | Used In  | Why Used                                          |
| ------------------------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------- |
| ![Node](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)      | Node.js    | Backend  | JavaScript runtime for scalable server-side logic |
| ![Express](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg) | Express.js | Backend  | Lightweight framework for building REST APIs      |
| ![MongoDB](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg) | MongoDB    | Database | Flexible NoSQL database for scalable storage      |
| ![Mongoose](https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png)             | Mongoose   | Backend  | Schema-based data modeling for MongoDB            |
| ![JWT](https://jwt.io/img/pic_logo.svg)                                                     | JWT        | Backend  | Secure authentication using tokens                |
| ![bcrypt](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)    | bcryptjs   | Backend  | Password encryption for security                  |
| ![Cloudinary](https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg)                       | Cloudinary | Backend  | Cloud-based image storage & optimization          |
| ![Multer](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg) | Multer     | Backend  | Handles file uploads                              |
| ![Nodemailer](https://www.vectorlogo.zone/logos/nodemailer/nodemailer-icon.svg)             | Nodemailer | Backend  | Sends email notifications                         |
| ![dotenv](https://dotenvx.com/logo.svg)                                                     | dotenv     | Backend  | Manages environment variables securely            |

---

# ✨ Core Features

## 🏨 Booking System

✔ Browse stays
✔ Book accommodations
✔ Cancel bookings
✔ Booking history

---

## 🏠 Listing Management

✔ Create listings
✔ Edit / delete listings
✔ Upload images
✔ Host dashboard

---

## 🔐 Authentication System

✔ JWT login/signup
✔ Password encryption
✔ Protected routes

---

## 🌍 Maps & Location

✔ Interactive Leaflet maps
✔ Location-based listings
✔ Real-world geolocation display

---

## 📷 Image System

✔ Cloudinary integration
✔ Fast image upload
✔ Optimized media delivery

---

## 📧 Email System

✔ Booking confirmation emails
✔ Nodemailer SMTP integration

---

# ⚙️ Environment Variables (IMPORTANT)

---

## 🟢 Backend `.env`

Create `.env` inside `/backend`

```env id="envbackend"
PORT=8000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465

CLIENT_URL=http://localhost:5173
```

---

## 🎨 Frontend `.env`

👉 (Optional – only if needed for scaling)

```env id="envfrontend"
VITE_API_URL=http://localhost:8000
```

---

# 🚀 Installation Guide

## 1️⃣ Clone Repo

```bash id="clone"
git clone https://github.com/kashodhanprinkal/WANDERLUST.git
cd WANDERLUST
```

---

## 2️⃣ Backend Setup

```bash id="be"
cd backend
npm install
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash id="fe"
cd frontend
npm install
npm run dev
```

---

# 🌐 Local URLs

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:8000](http://localhost:8000)

---

# 🧠 Concepts Used

✔ MVC Architecture
✔ REST API Design
✔ Authentication & Authorization
✔ Middleware System
✔ File Upload Handling
✔ Cloud Integration
✔ Email Automation
✔ Responsive UI Design
✔ Map-based UI system

---

# 📈 Project Impact

✔ Real-world SaaS-like application
✔ Production-ready architecture
✔ Scalable backend design
✔ Modern frontend UX
✔ Cloud + API integration experience
✔ Recruiter-friendly project structure

---

# 🔮 Future Improvements

* 💳 Payment Gateway (Razorpay/Stripe)
* 💬 Chat system (Host ↔ User)
* ❤️ Wishlist feature
* 📊 Admin dashboard analytics
* 🔔 Real-time notifications
* 🧠 AI travel recommendations

---

# 👨‍💻 Author

## Prinkal Kashodhan

🚀 *“Built with late-night debugging, coffee, and a strong belief that console.log is a valid development strategy.”*

* GitHub: [https://github.com/kashodhanprinkal](https://github.com/kashodhanprinkal)
* LinkedIn: [https://linkedin.com/in/prinkal-kashodhan](https://linkedin.com/in/prinkal-kashodhan)

---

# ⭐ Support

⭐ Star this repo if you like it
🍴 Fork it if you want to improve it
🚀 Share it with developers

---

# 💙 Final Note

Built with **MERN stack + modern UI engineering + real-world system design principles** to simulate a **production-grade travel booking platform** 🚀
