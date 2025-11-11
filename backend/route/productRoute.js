import { addProduct, getProductsByCategory ,getAllProducts,searchProducts} from "../controller/product.controller.js";
import express from "express";
import  authenticateUser  from "../middleware/isauth.js"; // your JWT auth
import upload from "../middleware/multer.js"; // multer setup for file uploads

const router = express.Router();

// Protected route: only logged-in users can add product
// 'image' must match the frontend input name
router.post("/addproduct", authenticateUser, upload.single("image"), addProduct);
router.get("/allproducts",getAllProducts );


// Public route: anyone can filter by category
router.post("/getbyCategory", getProductsByCategory);
// search products
router.get("/search",searchProducts);
export default router;
