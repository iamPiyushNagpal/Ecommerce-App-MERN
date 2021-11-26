import express from 'express';
const router = express.Router();
import { login, signup, getUserProfile } from '../controllers/userControllers.js';
import { auth } from '../middleware/authMiddleware.js';

router.post('/', signup);
router.post('/login', login);
router.route('/profile').get(auth, getUserProfile);

export default router;