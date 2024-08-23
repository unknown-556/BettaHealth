import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.log('Authentication required: No token provided');
        return res.status(401).send({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`Decoded Token: ${JSON.stringify(decoded)}`);

        const user = await User.findById(decoded.userId).select("-password");

        console.log('Found user:', user);
        if (!user) {
            console.log(`User not found for ID: ${decoded._id}`);
            return res.status(401).send({ error: 'User not found. Please authenticate.' });
        }

        req.token = token;
        req.user = user;
        console.log(`Authenticated User: ${user.email}`);
        next();
    } catch (error) {
        console.log(`Authentication failed: Invalid token - ${error.message}`);
        return res.status(401).send({ error: 'Invalid token. Please authenticate.' });
    }
};

export default auth;
