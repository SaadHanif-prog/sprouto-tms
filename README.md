# 📋 Task Management API Documentation (MERN Stack)

This is the official API documentation for the Task Management App built using MongoDB, Express.js, React, and Node.js (MERN stack). It supports full CRUD operations, user authentication via cookies, and task management.

---

## 🌐 Base URLs

- **Frontend:** `https://majestic-genie-9b3c4f.netlify.app/`
- **Backend API Base Path:** `https://majestic-genie-9b3c4f.netlify.app/api/v1`

---

## 🔐 Authentication Routes

**Base Path:** `/api/v1/auth`

### 🔸 POST `/signup`

- **Description:** Register a new user.
- **Body:**

```json
{
  "username": "john_doe",
  "password": "123456"
}
```

---

### 🔸 POST `/login`

- **Description:** Log in an existing user.
- **Body:**

```json
{
  "username": "john_doe",
  "password": "123456"
}
```

- **Response:** Sets an HTTP-only cookie containing the authentication token.

---

### 🔸 GET `/check-auth`

- **Description:** Check if a user is authenticated.
- **Auth:** Handled via cookie (no need for Authorization header)

---

### 🔸 POST `/logout`

- **Description:** Logs out the user and clears the auth cookie.

---

## ✅ Task Routes

**Base Path:** `/api/v1/tasks`

> ⚠️ **Authentication Required** for create, update, delete, and status update routes.  
> You must be signed in (handled via cookies automatically).

---

### 🔸 POST `/`

- **Description:** Create a new task.
- **Auth:** Must be signed in
- **Body:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

---

### 🔸 GET `/`

- **Description:** Get all tasks (public route).

---

### 🔸 GET `/:id`

- **Description:** Get a task by its ID.

---

### 🔸 PUT `/:id`

- **Description:** Update a task completely.
- **Auth:** Must be signed in
- **Body:**

```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "completed"
}
```

---

### 🔸 PUT `/:id/status`

- **Description:** Update task status only.
- **Auth:** Must be signed in
- **Body:**

```json
{
  "status": "completed"
}
```

---

### 🔸 DELETE `/:id`

- **Description:** Delete a task by ID.
- **Auth:** Must be signed in

---

## 🛠️ Task Schema (Mongoose)

```js
{
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
}
```

---

## 🧪 Testing the API

You can test this API using:

- **Postman** with cookies enabled
- Make sure to login first to set the cookie
- Then access protected routes

---

## 🧾 Notes

- No need to send Authorization headers. Token is stored in HTTP-only cookie.
- Sign up or login first to access protected task routes.

---

## 🔗 Links

- **Frontend:** [https://majestic-genie-9b3c4f.netlify.app/]
- **Backend Base Path:** [https://sprouto-tms.onrender.com]
