import express from 'express';
const router = express.Router();
import { login, signup, getUserProfile, updateUserProfile, getUsers } from '../controllers/userControllers.js';
import { auth, adminAuth } from '../middleware/authMiddleware.js';

router.route('/').post(signup).get(auth, adminAuth, getUsers);
router.post('/login', login);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;