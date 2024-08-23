import express from "express";
const router = express.Router()

import { createArticle, updateArticle } from "../controllers/postController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";
import role from "../middleware/role.js";
import { checkUserStatus } from "../controllers/admin.js";


router.post("/article",auth, role(['Writer']), checkUserStatus(['Active']), upload.single('image'), createArticle)

router.patch("/article/:id", role(['Writer']), checkUserStatus(['Active']), updateArticle);

export default router