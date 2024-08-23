import express from 'express';
import { getUser, toggleStatus, freezeAccount, unfreezeAccount, getAllUsers, adminSignIn } from '../controllers/admin.js';
import { checkAdminRole } from '../middleware/checkAdmin.js';

const router = express.Router()

router.post('/signin', adminSignIn)

router.get('/all', checkAdminRole('admin'), getAllUsers)
router.get('/user', checkAdminRole('admin'), getUser)
router.patch('/status', checkAdminRole('admin'), toggleStatus)
router.put("/freeze/:id", checkAdminRole('admin'), freezeAccount);
router.put("/unfreeze/:id", checkAdminRole('admin'), unfreezeAccount)


export default router