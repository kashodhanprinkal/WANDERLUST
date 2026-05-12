# 🌍 **Wanderlust**

## *MERN Travel & Hotel Booking Platform*

<div align="center">

### ✨ Explore • Book • Stay • Experience ✨

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-View_Project-2ea44f?style=for-the-badge&logo=render)](https://wanderlust-miim.onrender.com)
[![GitHub](https://img.shields.io/badge/📂_Source_Code-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/kashodhanprinkal/WANDERLUST)

</div>

---

## 🎯 **Quick Overview**

> **Production-ready Airbnb-inspired platform** where users can discover stays, book accommodations, manage listings, upload images, and explore locations through interactive maps.

| Built With | Key Features | Impact |
|------------|--------------|---------|
| MERN Stack | JWT Auth • Cloudinary • Maps • Email | Real-world SaaS simulation |
| MVC Architecture | Booking System • Host Dashboard | Production-ready code |
| REST APIs | Image Upload • Geolocation | Recruiter-friendly structure |

---

## ⚡ **Live Demo**

👉 [**https://wanderlust-miim.onrender.com**](https://wanderlust-miim.onrender.com)

> *Note: Free Render service may take ~30 seconds to wake up after inactivity*

---

## 📦 **Core Features** (What Recruiters Look For)

### 🔐 **Authentication & Security**
- JWT-based login/signup with `bcryptjs` encryption
- Protected routes & middleware authorization
- Secure password hashing

### 🏨 **Booking System**
- Browse → Book → Cancel → History
- Real-time availability management

### 🏠 **Host Dashboard**
- Create/Edit/Delete listings
- Multi-image upload via Cloudinary

### 🌍 **Maps Integration**
- Interactive Leaflet maps
- Location-based property display

### 📧 **Email Automation**
- Booking confirmations via Nodemailer
- SMTP integration (Gmail)

---

## 🛠️ **Tech Stack** (Clean & Scannable)

### Frontend
```
React 19.1.0  │  Vite  │  Tailwind CSS  │  React Router  │  Axios  │  Leaflet
```

### Backend
```
Node.js  │  Express  │  MongoDB  │  Mongoose  │  JWT  │  bcryptjs
```

### Cloud & Services
```
Cloudinary (Images)  │  Nodemailer (Email)  │  Render (Hosting)
```

---

## 🚀 **Quick Start** (5-Minute Setup)

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account
- Gmail (for email notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/kashodhanprinkal/WANDERLUST.git
cd WANDERLUST

# Backend setup
cd backend
npm install
# Create .env file (see below)
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### Critical Environment Variables

**Backend `.env`** (required - will not work without these):

```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/wanderlust
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587  # Use 587 for TLS, 465 for SSL

CLIENT_URL=http://localhost:5173
```

> ⚠️ **Gmail users**: Enable 2-factor authentication and generate an [App Password](https://myaccount.google.com/apppasswords) - regular password won't work.

**Frontend `.env`** (optional):
```env
VITE_API_URL=http://localhost:8000
```

### Local URLs After Setup
| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |

---

## 📂 **Project Structure** (What Matters)

```
WANDERLUST/
├── backend/
│   ├── models/          # User, Listing, Booking schemas
│   ├── controllers/     # Auth, listings, bookings logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, upload handlers
│   └── utils/           # Cloudinary, email config
└── frontend/
    ├── src/
    │   ├── pages/       # Home, Listing, Booking, Dashboard
    │   ├── components/  # Navbar, Map, Card, Forms
    │   └── context/     # Auth context provider
    └── tailwind.config.js
```

**Key Files to Review** (show your code quality):
- `backend/models/Booking.js` - Schema design
- `backend/controllers/authController.js` - JWT logic
- `frontend/src/context/AuthContext.jsx` - Auth state management

---

## 🔌 **Sample API Endpoints**

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/auth/register` | Create account | ❌ |
| POST | `/api/auth/login` | Get JWT token | ❌ |
| GET | `/api/listings` | Get all properties | ❌ |
| POST | `/api/listings` | Create listing | ✅ (Host) |
| POST | `/api/bookings` | Book a stay | ✅ |
| GET | `/api/bookings/my` | User booking history | ✅ |
| PUT | `/api/listings/:id` | Update listing | ✅ (Owner) |
| DELETE | `/api/listings/:id` | Delete listing | ✅ (Owner) |

---

## 🧠 **Concepts Demonstrated**

| Concept | Where to Find It |
|---------|------------------|
| MVC Architecture | `backend/` (models → controllers → routes) |
| JWT Authentication | `middleware/auth.js` + `controllers/authController.js` |
| File Upload | `middleware/upload.js` + Cloudinary integration |
| REST API Design | All routes follow REST conventions |
| Email Automation | `utils/emailService.js` |
| Map Integration | `frontend/src/components/Map.jsx` (Leaflet) |
| Responsive Design | Tailwind CSS utility classes |

---

## 🔮 **Future Roadmap** (Shows Vision)

- [ ] 💳 **Payment Gateway** (Razorpay/Stripe integration)
- [ ] 💬 **Chat System** (Socket.io for host-guest messaging)
- [ ] ❤️ **Wishlist** (Save favorite properties)
- [ ] 📊 **Admin Analytics** (Dashboard with metrics)
- [ ] 🔔 **Real-time Notifications** (Booking updates)
- [ ] 🤖 **AI Recommendations** (Personalized suggestions)

---

## 📈 **Project Metrics** (For Your Resume)

| Metric | Value |
|--------|-------|
| Lines of Code | ~8,500 (full stack) |
| API Endpoints | 15+ REST routes |
| Database Models | 3 (User, Listing, Booking) |
| Components | 20+ React components |
| User Flow | Auth → Browse → Book → Confirm |

---

## 👨‍💻 **Author**

### **Prinkal Kashodhan**
> Full-stack developer who debugs with console.log and believes in shipping working code.

[![GitHub](https://img.shields.io/badge/GitHub-kashodhanprinkal-181717?logo=github)](https://github.com/kashodhanprinkal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Prinkal_Kashodhan-0A66C2?logo=linkedin)](https://linkedin.com/in/prinkal-kashodhan)

---

## ⭐ **Support This Project**

If this project helped you or inspired you:
- ⭐ **Star** the repo
- 🍴 **Fork** it for your own improvements
- 📢 **Share** it with fellow developers

---

## 📝 **License**

MIT © Prinkal Kashodhan

---

<div align="center">

### *Built with late-night coffee, console.log, and the MERN stack* ☕🚀

**[⬆ Back to Top](#wanderlust)**

</div>

---
