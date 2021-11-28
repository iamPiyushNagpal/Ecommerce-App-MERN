import express from 'express';
const router = express.Router();
import { login, signup, getUserProfile, updateUserProfile } from '../controllers/userControllers.js';
import { auth } from '../middleware/authMiddleware.js';

router.post('/', signup);
router.post('/login', login);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;