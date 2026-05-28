# Task Manager App

A full-stack task management application built with the PERN stack (PostgreSQL, Express, React, Node.js). This project was developed as part of an internship selection process.

## 🚀 Live Demo

- **Frontend:** [https://task-manager-app-alpha-teal.vercel.app](https://task-manager-app-alpha-teal.vercel.app)
- **Backend API:** [https://task-manager-backend-xyy9.onrender.com](https://task-manager-backend-xyy9.onrender.com)

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS v4, Lucide Icons, Axios.
- **Backend:** Node.js, Express, Sequelize ORM.
- **Database:** PostgreSQL (Hosted on Neon.tech).
- **Authentication:** JWT (JSON Web Tokens) with Bcryptjs for password hashing.
- **Deployment:** Vercel (Frontend), Render (Backend).

## 📌 Key Features

- **User Authentication:** Secure Sign-up and Login.
- **Task CRUD:** Create, Read, Update, and Delete tasks.
- **Status Tracking:** Toggle tasks between 'To Do', 'In Progress', and 'Completed'.
- **Responsive UI:** Optimized for both mobile and desktop views.
- **Protected Routes:** Dashboard is only accessible to authenticated users.

## 🧠 Technical Decisions & Tradeoffs

- **Sequelize ORM:** Chosen over raw SQL to handle database migrations and relationships more efficiently, allowing for easier switching between development (SQLite/Local PG) and production (Cloud PG).
- **Monorepo Structure:** Both frontend and backend are in one repository for easier management and deployment synchronization, though they are deployed as separate services.
- **Tailwind CSS v4:** Used the latest version of Tailwind for high-performance styling and modern CSS features.
- **JWT in LocalStorage:** For simplicity in this assignment, JWT is stored in LocalStorage. In a high-security production environment, HttpOnly cookies would be preferred to mitigate XSS risks.

## 📝 Assumptions

- **Database Connectivity:** Assumes a stable internet connection for the backend to communicate with the Neon.tech cloud database.
- **Session Duration:** JWT tokens are set to expire in 30 days for a better user experience during the testing phase.
- **Single User View:** The application assumes each user only needs to manage their own private list of tasks.

## ⚙️ Installation & Setup

1. **Clone the repo:** `git clone https://github.com/Chaitanya2238/task-manager-app.git`
2. **Backend Setup:**
   - `cd backend`
   - `npm install`
   - Create a `.env` file with `DATABASE_URL` and `JWT_SECRET`.
   - `npm start`
3. **Frontend Setup:**
   - `cd frontend`
   - `npm install`
   - `npm run dev`

---

Developed by Chaitanya.
