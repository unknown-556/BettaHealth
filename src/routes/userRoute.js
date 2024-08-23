import express from 'express';
import { getProfile, getUserProfile } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/profile', auth, getUserProfile);
router.get('writer', getProfile)

export default router;
