import express from 'express';
const router = express.Router();
import {
    login, signup, getUserProfile, updateUserProfile, getUsers, deleteUser,
    getUserById, updateUser
} from '../controllers/userControllers.js';
import { auth, adminAuth } from '../middleware/authMiddleware.js';

router.route('/').post(signup).get(auth, adminAuth, getUsers);
router.post('/login', login);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);
router.route('/:id')
    .delete(auth, adminAuth, deleteUser)
    .get(auth, adminAuth, getUserById)
    .put(auth, adminAuth, updateUser);

export default router;