import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById } from '../controllers/orderControllers.js';
import { auth } from '../middleware/authMiddleware.js';

router.route('/').post(auth, addOrderItems);
router.route('/:id').get(auth, getOrderById);

export default router;