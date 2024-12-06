
# **Backend System for Academic Course Management**

This project is a robust backend system designed for managing academic activities, including user management (admins, students, and faculty), course offerings, semester registrations, and department management. It is built with **TypeScript**, **Node.js**, and **MongoDB**. This document provides an in-depth explanation of the system architecture, features, and setup process.

---

## **Table of Contents**
1. [Features](#features)  
2. [ER Diagram](#er-diagram)  
3. [Project Structure](#project-structure)  
4. [Installation and Setup](#installation-and-setup)  
5. [Modules Overview](#modules-overview)  
6. [API Endpoints](#api-endpoints)  
7. [Technologies Used](#technologies-used)  
8. [Future Enhancements](#future-enhancements)  

---

## **Features**

This system is designed to streamline academic course management with the following capabilities:
- **User Role Management**: Admins, faculty, and students with unique roles and privileges.
- **Course Management**: Create and manage courses, including prerequisites and faculty assignments.
- **Semester Management**: Manage academic semesters and allow student registrations.
- **Department and Faculty Management**: Define academic departments and assign faculty.
- **Validation and Error Handling**: Comprehensive middleware to handle validation and errors.
- **Secure Authentication**: Role-based access control using JWT.
- **Scalable Architecture**: Modular structure for future growth.

---

## **ER Diagram**

The database schema is visually represented in the following ER diagram:

![ER Diagram](erdiagram.png)

Key entities include:
1. **User Model**: Manages user credentials and authentication.
2. **Admin/Student/Faculty Models**: Extend the user model for specific functionalities.
3. **Course and OfferedCourse Models**: Represent course data and the courses offered in a semester.
4. **AcademicDepartment and Faculty Models**: Organize departments and faculty members.
5. **SemesterRegistration and AcademicSemester Models**: Facilitate student registrations and semester management.

---

## **Project Structure**

```
src/
│
├── app/
│   ├── builder/         # Initialization logic for specific features or services
│   ├── config/          # Configuration files for environment, database, etc.
│   ├── DB/              # MongoDB connection and ORM models (Mongoose)
│   ├── errors/          # Custom error classes and global error handling
│   ├── interface/       # TypeScript interfaces and types for the application
│   ├── middlewares/     # Middleware for authentication, validation, etc.
│   ├── modules/         # Core features such as user, course, and semester management
│   ├── routes/          # API route definitions and linking to modules
│   └── utils/           # Helper functions (e.g., data formatting, token generation)
│
├── app.ts               # Entry point for initializing the application
└── server.ts            # Server startup script (port and environment setup)
```

### **Key Folders**
1. **`builder/`**: Handles the initialization of services or complex components.
2. **`config/`**: Includes configurations such as database connection strings and environment variables.
3. **`DB/`**: Contains database schemas and connection logic (uses Mongoose).
4. **`errors/`**: Custom error classes like `ValidationError` and centralized error handling.
5. **`middlewares/`**: Implements middlewares like authentication, input validation, etc.
6. **`modules/`**: Core application logic for managing users, courses, and registrations.
7. **`routes/`**: Maps API routes to the respective controllers.

---

## **Installation and Setup**

### 1. **Clone the Repository**
	 ```bash
	 git clone <repository-url>
	 cd <repository-name>
	 ```

### 2. **Install Dependencies**
	 Use `npm` or `yarn` to install the required dependencies:
	 ```bash
	 npm install
	 ```

### 3. **Environment Configuration**
	 Create a `.env` file in the root directory with the following environment variables:
	 ```
	 PORT=3000
	 DB_URI=<your_mongodb_connection_string>
	 JWT_SECRET=<your_jwt_secret_key>
	 ```

### 4. **Run the Application**
	 Start the application in development mode:
	 ```bash
	 npm run dev
	 ```
	 Or, run in production mode:
	 ```bash
	 npm start
	 ```

---

## **Modules Overview**

### **1. User Management**
	 - **Models**: `User`, `Admin`, `Student`, `Faculty`
	 - **Features**:
		 - Registration and login functionality.
		 - Role-based access control.
		 - Password hashing and authentication using JWT.

### **2. Course Management**
	 - **Models**: `Course`, `OfferedCourse`, `PreRequisiteCourses`
	 - **Features**:
		 - CRUD operations for courses.
		 - Define and validate prerequisites.
		 - Assign faculty to specific courses.

### **3. Semester and Registration**
	 - **Models**: `AcademicSemester`, `SemesterRegistration`
	 - **Features**:
		 - Create and manage academic semesters.
		 - Allow students to register for courses.
		 - Enforce maximum capacity for courses.

### **4. Department and Faculty Management**
	 - **Models**: `AcademicFaculty`, `AcademicDepartment`
	 - **Features**:
		 - Create and manage departments.
		 - Assign faculty to departments.

---

## **API Endpoints**

### **User APIs**
- **POST /users/register**: Register a new user.
- **POST /users/login**: Authenticate and retrieve a JWT token.
- **GET /users/profile**: Fetch user details.

### **Course APIs**
- **GET /courses**: List all available courses.
- **POST /courses**: Create a new course.
- **PUT /courses/:id**: Update course information.
- **DELETE /courses/:id**: Delete a course.

### **Semester APIs**
- **GET /semesters**: Retrieve academic semesters.
- **POST /semesters**: Create a new semester.

### **Registration APIs**
- **POST /registrations**: Register a student for a course.

> **Full API documentation**: https://documenter.getpostman.com/view/28160711/2sA2r6ZQnQ

---

## **Technologies Used**

- **Framework**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Joi/Express-Validator
- **Error Handling**: Centralized error middleware

---

## **Future Enhancements**

1. Implement real-time notifications for students and faculty.
2. Add a frontend integration guide.
3. Role-based dashboards for admin, faculty, and students.
4. Add unit and integration tests using **Jest**.
5. Improve scalability with microservices architecture.

---
