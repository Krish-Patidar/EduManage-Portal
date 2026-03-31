# 🎓 Infoviaan Technologies — Training Institute Management System

<div align="center">

![Infoviaan Technologies](https://img.shields.io/badge/Infoviaan-Technologies-E10600?style=for-the-badge&logo=react)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-00C58E?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**A full-stack Training Institute Management System built with the MERN stack.**  
Public-facing website + role-based admin portal for managing courses, batches, attendance, and payments.

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Roles & Permissions](#roles--permissions)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## 🏫 About The Project

Infoviaan Technologies is a complete Training Institute Management System designed for IT training institutes. It combines a **premium public website** for student acquisition with a **powerful admin portal** for institute management.

The system handles everything from course listings and student enrollment to attendance tracking and payment management — all secured with JWT-based role authentication.

---

## ✨ Features

### 🌐 Public Website
- Animated single-page landing with smooth scroll navigation
- Course listings with category filters (Development, Data, Design, Marketing)
- Auto-sliding testimonial carousel with progress bar
- About Us with founder section and certifications
- Contact / Book Demo form with validation
- Fully responsive across all devices

### 🔐 Authentication
- JWT-based login and registration
- Role-based access control (Admin, Instructor, Student)
- Automatic redirect to role-specific dashboard on login
- Token stored in localStorage with Axios interceptors

### 👨‍💼 Admin Portal
- Dashboard with live stats (students, courses, revenue, batches)
- Full CRUD for Courses, Batches, Students, Instructors
- Student enrollment into courses and batches
- Attendance management across all batches
- Payment recording with auto-generated receipt numbers
- Activate/deactivate user accounts

### 👨‍🏫 Instructor Portal
- View assigned batches and students
- Mark and update attendance per session
- View student list with attendance status

### 👨‍🎓 Student Portal
- View enrolled courses and batch details
- Session-wise attendance report with percentage
- Payment history with balance due tracking

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router DOM | Client-side routing |
| Axios | HTTP client + interceptors |
| Context API | Global auth state |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Nodemailer | Email notifications |
| Helmet.js | Security headers |
| express-rate-limit | Rate limiting |

---

## 📁 Project Structure

```
EduManage-Portal/
│
├── infoviaan/                    # React Frontend
│   └── src/
│       ├── api/
│       │   └── axios.js          # Axios instance + interceptors
│       ├── context/
│       │   └── AuthContext.jsx   # Global auth state
│       ├── components/
│       │   └── shared/
│       │       ├── DashboardLayout.jsx
│       │       └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── auth/             # Login, Register
│       │   ├── admin/            # Admin dashboards
│       │   ├── instructor/       # Instructor dashboards
│       │   └── student/          # Student dashboards
│       └── App.jsx
│
└── server/                       # Node.js Backend
    ├── config/
    │   └── db.js                 # MongoDB connection
    ├── controllers/              # Business logic
    │   ├── authController.js
    │   ├── userController.js
    │   ├── courseController.js
    │   ├── batchController.js
    │   ├── attendanceController.js
    │   └── paymentController.js
    ├── models/                   # Mongoose schemas
    │   ├── User.js
    │   ├── Course.js
    │   ├── Batch.js
    │   ├── Attendance.js
    │   └── Payment.js
    ├── routes/                   # API routes
    ├── middleware/
    │   ├── authMiddleware.js     # JWT verification
    │   └── roleMiddleware.js     # Role authorization
    ├── utils/
    │   ├── generateToken.js
    │   └── sendEmail.js
    └── server.js
```
---

## 🔑 Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing tokens (min 32 chars) |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| `EMAIL_USER` | Gmail address for Nodemailer |
| `EMAIL_PASS` | Gmail App Password |
| `CLIENT_ORIGIN` | Frontend URL for CORS |
| `NODE_ENV` | `development` or `production` |

### Frontend (`infoviaan/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protected |
| PUT | `/api/auth/change-password` | Protected |

### Users
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/users` | Admin, Instructor |
| GET | `/api/users/:id` | Admin, Self |
| PUT | `/api/users/:id` | Admin, Self |
| PATCH | `/api/users/:id/toggle-status` | Admin |
| DELETE | `/api/users/:id` | Admin |

### Courses
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/courses` | Public |
| GET | `/api/courses/:slug` | Public |
| POST | `/api/courses` | Admin |
| PUT | `/api/courses/:id` | Admin |
| DELETE | `/api/courses/:id` | Admin |
| POST | `/api/courses/:id/enroll` | Admin, Student |

### Batches
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/batches` | Admin, Instructor |
| POST | `/api/batches` | Admin |
| PUT | `/api/batches/:id` | Admin |
| DELETE | `/api/batches/:id` | Admin |
| POST | `/api/batches/:id/students` | Admin |

### Attendance
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/attendance` | Admin, Instructor |
| GET | `/api/attendance/batch/:batchId` | Admin, Instructor |
| GET | `/api/attendance/student/:studentId/batch/:batchId` | Admin, Self |

### Payments
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/payments` | Admin |
| GET | `/api/payments` | Admin |
| GET | `/api/payments/student/:studentId` | Admin, Self |
| PUT | `/api/payments/:id` | Admin |

---

## 👥 Roles & Permissions

| Feature | Admin | Instructor | Student |
|---|---|---|---|
| View Dashboard | ✅ | ✅ | ✅ |
| Manage Courses | ✅ | ❌ | ❌ |
| Manage Batches | ✅ | ❌ | ❌ |
| Enroll Students | ✅ | ❌ | ✅ (self) |
| Mark Attendance | ✅ | ✅ | ❌ |
| View Attendance | ✅ | ✅ | ✅ (own) |
| Record Payments | ✅ | ❌ | ❌ |
| View Payments | ✅ | ❌ | ✅ (own) |
| Manage Users | ✅ | ❌ | ❌ |

---

## 🔮 Upcoming Features

- [ ] Online fee payment via Razorpay
- [ ] Student progress tracking
- [ ] Certificate generation and download
- [ ] WhatsApp notification integration
- [ ] Admin analytics dashboard with charts
- [ ] Blog / resource center
- [ ] Mobile app (React Native)

---

## 📄 License

Distributed under the MIT License.

---

<div align="center">
  Made with ❤️ by Infoviaan Technologies
</div>
