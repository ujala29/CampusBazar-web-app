import {getcurrentuser,updateUserProfile} from '../controller/user.controller.js';
import isauth from '../middleware/isauth.js';
import express from 'express';
const router = express.Router();
router.get('/currentuser', isauth, getcurrentuser);
router.put('/updateprofile', isauth, updateUserProfile);
export default router;