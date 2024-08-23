import express from 'express';
import { getProfile, getUserProfile } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import { checkUserStatus } from '../controllers/admin.js';


const router = express.Router();

router.get('/profile', auth, checkUserStatus(['Active']), getUserProfile);
router.get('writer', getProfile)

export default router;
