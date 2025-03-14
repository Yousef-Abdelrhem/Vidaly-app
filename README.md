# Vidaly App

Vidaly-app is a **Node.js RESTful API** designed for managing genres, customers, movies, rentals, and users. It leverages **MongoDB** for data storage and incorporates authentication and authorization mechanisms using **JWT (JSON Web Token)**.

---

## 🚀 Features

- **CRUD operations** for genres, customers, movies, and rentals.
- **User authentication & authorization** with JWT.
- **Middleware integration** for security and performance enhancement.
- **Input validation** using Joi.
- **Secure password hashing** with bcrypt.
- **Efficient request handling** with Express.js.

---

## 🛠️ Technologies Used

- **Node.js** – Server-side JavaScript runtime.
- **Express.js** – Fast and minimalist web framework.
- **MongoDB & Mongoose** – NoSQL database and ODM.
- **JWT** – Secure authentication via tokens.
- **bcrypt** – Password hashing for security.
- **Joi** – Schema validation for request data.
- **Helmet & Compression** – Security and performance optimizations.

---

## 🔧 Setup Instructions

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (version 22.13.1)
- **MongoDB** (installed and running)

### **Installation**

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/Vidaly-app.git
   cd Vidaly-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory and add:
     ```env
     jwtPrivateKey=yourSecretKey
     ```

4. **Start the MongoDB server:**
   ```sh
   mongod
   ```

5. **Run the application:**
   - **For production:**
     ```sh
     npm start
     ```
   - **For development:**
     ```sh
     npm run dev
     ```

---

## 📌 API Endpoints

### **Genres**
- `GET /api/genres` → Get all genres
- `GET /api/genres/:id` → Get a genre by ID
- `POST /api/genres` → Create a new genre
- `PUT /api/genres/:id` → Update a genre by ID
- `DELETE /api/genres/:id` → Delete a genre by ID

### **Customers**
- `GET /api/customers` → Get all customers
- `GET /api/customers/:id` → Get a customer by ID
- `POST /api/customers` → Create a new customer
- `PUT /api/customers/:id` → Update a customer by ID
- `DELETE /api/customers/:id` → Delete a customer by ID

### **Movies**
- `GET /api/movies` → Get all movies
- `GET /api/movies/:id` → Get a movie by ID
- `POST /api/movies` → Create a new movie
- `PUT /api/movies/:id` → Update a movie by ID
- `DELETE /api/movies/:id` → Delete a movie by ID

### **Rentals**
- `POST /api/rentals` → Create a new rental
- `GET /api/rentals/:id` → Get a rental by ID

### **Users**
- `GET /api/users/me` → Get the current user
- `POST /api/users` → Register a new user

### **Authentication**
- `POST /api/auth` → Authenticate a user and receive a JWT token

---

## 🔑 Usage Guide

### **Register a New User**
#### Request:
```sh
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### **Authenticate a User**
#### Request:
```sh
POST /api/auth
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```
#### Response:
```json
{
  "token": "your-jwt-token"
}
```

### **Access Protected Routes**
Include the JWT token in the request headers for authentication:
```sh
GET /api/genres
x-auth-token: your-jwt-token
```

