# 🌍 Wanderlust – MERN Travel Booking Platform


**Wanderlust** is a full-stack travel and hotel booking platform built using the **MERN stack**. It provides users the ability to browse, book, and manage travel stays. Admins and hosts can manage listings, while backend services handle image uploads, geolocation, and email confirmations.

---

## 🌐 Live Demo

🧪 Try it out:  
👉 **[wanderlust-miim.onrender.com](https://wanderlust-miim.onrender.com/)**

---

## 📦 Project Structure

```

WANDERLUST/
├── frontend/      → React.js (Tailwind CSS, Vite)
├── backend/       → Express.js + MongoDB + Cloudinary

````

---

## 🚀 Getting Started

### 🖥️ Clone the Project

```bash
git clone https://github.com/kashodhanprinkal/WANDERLUST.git
cd WANDERLUST
````

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### 📄 Create `.env` file:

```env
PORT=8000

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/wunderlust

JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

USER_AGENT=WunderlustApp/1.0 (kashodhanprinkal@gmail.com)

EMAIL_USER=example@gmail.com
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
```

### ▶️ Start Backend Server

```bash
npm run dev
# Server running at http://localhost:8000
```

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

✅ Make sure backend is running before starting the frontend.

---

## ✨ Core Features

* 🔐 **JWT Authentication** (Login, Register)
* 🏨 **Hotel Management** (CRUD for Hosts/Admins)
* 📦 **Booking System** (View, Create, Cancel)
* 📷 **Image Uploads** with Cloudinary
* 🌍 **Location Geocoding** via OpenStreetMap
* 📧 **Email Notifications** (SMTP + Nodemailer)
* 📱 **Responsive UI** using Tailwind CSS

---

## 🔗 Tech Stack

### Backend

* Node.js, Express.js
* MongoDB + Mongoose
* JWT, Bcrypt, Multer
* Nodemailer (Gmail SMTP)
* Cloudinary
* OpenStreetMap Nominatim

### Frontend

* React.js (with Vite)
* Tailwind CSS
* React Router
* Axios

---

## 📬 Contact

Made with ❤️ by **Prinkal Kashodhan**
📧 Email: [kashodhanprinkal@gmail.com](mailto:kashodhanprinkal@gmail.com)
🔗 GitHub: [@kashodhanprinkal](https://github.com/kashodhanprinkal)

---

## 🤝 Contributing

Contributions are welcome!  
If you find bugs, have ideas, or want to improve something — feel free to fork the repo and open a pull request.

---

## 🙌 Credits

This project was created as part of my personal learning journey.  
Special thanks to the open-source community, tutorials, and docs that helped me build Wanderlust.

---

## 🪪 License

This project is open-source and available under the **MIT License**.  
You are free to use, modify, and share it with proper credit.


