import express from 'express';
const router = express.Router();
import {
    addOrderItems, getOrderById,
    updateOrderToPaid
} from '../controllers/orderControllers.js';
import { auth } from '../middleware/authMiddleware.js';

router.route('/').post(auth, addOrderItems);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').put(auth, updateOrderToPaid);

export default router;