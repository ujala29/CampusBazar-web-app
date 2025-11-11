import {signup,login,logout, googlelogin,verifyOtp} from '../controller/auth.controller.js';

import express from 'express';

const router = express.Router();

router.post('/signup', signup);
router.post("/verify-otp", verifyOtp);


router.post('/login', login);
router.get('/logout', logout);
router.post('/googlelogin', googlelogin);

export default router;