import Application from '../models/apply.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createArticle = async (req, res) => {
    try {
        const { image, title, description, content, category } = req.body;

        let imageUrl = "";

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                resource_type: 'auto',
            });
            imageUrl = uploadResponse.secure_url;
            console.log('Image uploaded successfully:', imageUrl);
        }

        const article = {
            image: imageUrl,
            title, 
            description, 
            content, 
            category
        };

        const { id } = req.params;

        const updatedProfile = await Application.findByIdAndUpdate(
            id,
            { $push: { articles: article } },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(201).send(updatedProfile);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(400).send({ error: error.message });
    }
};






export const updateArticle = async (req, res) => {
    try {
        const { profileId, articleId } = req.params;
        const { title, description, content, category, image } = req.body;


        const profile = await Application.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        const article = profile.articles.id(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                resource_type: 'auto',
            });
            article.image = uploadResponse.secure_url;
        }

        if (title) article.title = title;
        if (description) article.description = description;
        if (content) article.content = content;
        if (category) article.category = category;

        await profile.save();

        res.status(200).json({ message: 'Article updated successfully', article });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

