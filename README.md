# 💸 Expense Tracker App

A full-stack Expense Tracker application built using the MERN stack.

## 🚀 Features
- User Authentication (JWT Login/Register)
- Add, Edit, Delete Expenses
- Category-wise Expense Dashboard
- Error handling & loading states

## 🛠 Tech Stack
Frontend: React.js (Vite)  
Backend: Node.js, Express.js  
Database: MongoDB  

## 📁 Project Structure
Client/ → React frontend  
Server/ → Node.js backend  

## ⚙️ Setup Instructions

### 1. Clone the repo
git clone https://github.com/yshpatil06/Expense-Tracker

### 2. Backend setup
cd Server  
npm install  
npm start  

### 3. Frontend setup
cd Client  
npm install  
npm run dev  

## 🔑 Environment Variables
Create a `.env` file in Server folder:

MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret_key  

## 📦 API Endpoints
- POST /api/auth/register  
- POST /api/auth/login  
- GET /api/expenses  
- POST /api/expenses  
- PUT /api/expenses/:id  
- DELETE /api/expenses/:id  

## 📌 Note
This project is implemented using React.js instead of React Native.  
The backend and architecture are designed to be easily adaptable for a React Native mobile application. I am actively learning React Native and interested in extending this project further.
