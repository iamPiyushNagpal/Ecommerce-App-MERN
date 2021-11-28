import userModel from '../models/userModel.js';
import asyncHandler from "express-async-handler";

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateToken(user._id)
        })
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201);
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id);
    if (user) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: user.generateToken(updatedUser._id)
        })
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
})

export { login, signup, getUserProfile, updateUserProfile };