import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import userModel from '../models/userModel.js';

const auth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(e);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized')
    }
})

export { auth };