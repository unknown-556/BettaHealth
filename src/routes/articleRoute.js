import express from "express";
const router=express.Router()
import{ getAllArticles, getArticlesByCategory, getSingleArticle, getRandomArticles, addComment  } from '../controllers/articleController.js'
import auth from "../middleware/auth.js";

router.get("/", getAllArticles)
router.get('/articles/:category',  getArticlesByCategory);
router.get("/:id", getSingleArticle)

router.get("/other", getRandomArticles)

router.post("/comment", auth, addComment);

export default router