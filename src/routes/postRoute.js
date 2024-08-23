import express from "express";
const router = express.Router()

import { createArticle, updateArticle } from "../controllers/postController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";
import role from "../middleware/role.js";

router.post("/article", role(['Writer']), auth, upload.single('image'), createArticle)

router.put("/article/:id", role(['Writer']), updateArticle);

export default router