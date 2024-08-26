import Application from "../models/apply.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";



export const addComment = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { text, image } = req.body; 
        let imageUrl = "";

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                resource_type: 'auto',
            });
            imageUrl = uploadResponse.secure_url;
            console.log('Image uploaded successfully:', imageUrl);
        }

        const comment = {
            image: imageUrl,
            text, 
            postedBy: user.userName || `${user.firstName} ${user.lastName}`,
        };

        const { applicationId, articleId } = req.params;


        const application = await Application.findOneAndUpdate(
            { _id: applicationId, 'articles._id': articleId },
            { $push: { 'articles.$.comments': comment } }, 
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application or article not found' });
        }

        const updatedArticle = application.articles.id(articleId);
        res.status(201).send(updatedArticle);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(400).send({ error: error.message });
    }
};




export const getAllArticles = async (req, res) => {
    try {
        const articles = await Application.find({}, 'articles');

        const allArticles = articles.flatMap(profile => profile.articles);

        allArticles.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(allArticles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



export const getArticlesByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const articles = await Application.find([
            { $unwind: "$articles" },
            { $match: { "articles.category": category } },
            { $project: { "articles": 1, _id: 0 } }
        ]);

        const filteredArticles = articles.map(profile => profile.articles);

        if (filteredArticles.length === 0) {
            return res.status(404).json({ message: 'No articles found in this category.' });
        }

        filteredArticles.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(filteredArticles);
    } catch (error) {
        console.error('Error fetching articles by category:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};




export const getSingleArticle = async (req, res) => {
    try {
        const { articleId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({ message: 'Invalid article ID' });
        }

        const application = await Application.findOne(
            { "articles._id": articleId },
            { "articles.$": 1 } 
        );

        if (!application || application.articles.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const article = application.articles[0]; 

        res.status(200).json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};




export const getRandomArticles = async (req, res) => {
    try {
        const articles = await Application.aggregate([
            { $unwind: "$articles" }, 
            { $sample: { size: 5 } },
            { $project: { "articles": 1, _id: 0 } }
        ]);

        const randomArticles = articles.map(profile => profile.articles);

        res.status(200).json(randomArticles);
    } catch (error) {
        console.error('Error fetching random articles:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


