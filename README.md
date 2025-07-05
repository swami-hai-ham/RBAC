# Collaborative Task Manager with MERN Stack

## Overview

A full-stack task management application built using the MERN stack with Role-Based Access Control (RBAC). It enables users to create, assign, filter, and update tasks securely based on their roles (Admin, Manager, Member).

---

## Features

* **User Authentication** (JWT-based)
* **RBAC Enforcement**

  * Admin: Full access
  * Manager: Can create, update, view all tasks
  * Member: Can view and update only assigned tasks
* **Task Operations**

  * Create / Update / Delete / Filter Tasks
  * Assign tasks to users
* **User Management** (Admins only)

  * Change user roles
  * Delete users
* **Responsive UI with Material UI**
* **Global Error Toast Handling**

---

## Tech Stack

### Frontend:

* React (Vite)
* Axios
* React Router
* Material UI

### Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose
* Zod (Validation)
* JWT

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/swami-hai-ham/RBAC.git
cd RBAC
```

### 2. Environment Variables

#### Backend (`/backend/.env`):

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

#### Frontend (`/frontend/.env`):

```
VITE_API_BASE_URL=https://your-backend-url.com/api
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run Locally

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

---

## API Endpoints

### Auth

* `POST /api/v1/auth/register` - Register user
* `POST /api/v1/auth/login` - Login
* `GET /api/v1/auth/me` - Get current user

### Users (Admins only)

* `GET /api/v1/users` - List users
* `PUT /api/v1/users/:id` - Change role
* `DELETE /api/v1/users/:id` - Delete user

### Tasks

* `GET /api/v1/tasks` - List tasks (filtered by role/query)
* `POST /api/v1/tasks` - Create task
* `PATCH /api/v1/tasks/:id` - Update status or assignee (based on role)

---

## Role-Based Access Summary

| Role    | View Tasks | Create Tasks | Update Task  | Reassign | Manage Users |
| ------- | ---------- | ------------ | ------------ | -------- | ------------ |
| Admin   | All        | ✅            | ✅            | ✅        | ✅            |
| Manager | All        | ✅            | ✅            | ✅        | ❌            |
| Member  | Assigned   | ❌            | ✅ (only own) | ❌        | ❌            |

---

## Global Error Handling

* Errors are caught by Axios interceptor
* Dispatched to global snackbar via `window.dispatchEvent`

---

## Deployment

* **Frontend**: Vercel
* **Backend**: Render

---

