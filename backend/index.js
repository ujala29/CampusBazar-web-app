import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";

import connectDB from './config/db.js';
import authRoutes from './route/authRoute.js';
import userRoutes from './route/userRoute.js';
import productRoutes from './route/productRoute.js';
import orderRoutes from './route/orderRoute.js';
// Load environment variables
dotenv.config();

// Create Express app ✅
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cookie parser should be here (AFTER express app is created)
app.use(cookieParser());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to OneCart API' });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use("/api/order", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
