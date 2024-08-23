import express from "express";
import authRoute from './authRoute.js'
import postRoute from './postRoute.js'
import articleRoute from './articleRoute.js'
import userRoute from './userRoute.js'
import adminRoute from './admin.js'
const router = express.Router()

router.use('/auth', authRoute)
router.use('/post', postRoute )
router.use('/article', articleRoute)
router.use('/get', userRoute)
router.use('/admin', adminRoute)


export default router;