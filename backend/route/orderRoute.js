import express from "express";
import { createOrder } from "../controller/order.controller.js";
import  isAuthenticated  from "../middleware/isauth.js"; // <-- ensure buyer is logged in

const router = express.Router();

// POST => Buyer places order
router.post("/create", isAuthenticated, createOrder);

export default router;
