import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
