import express from 'express';
const router = express.Router();
import {
    addOrderItems, getMyOrders, getOrderById, updateOrderToPaid
} from '../controllers/orderControllers.js';
import { auth } from '../middleware/authMiddleware.js';

router.route('/').post(auth, addOrderItems);
router.route('/myorders').get(auth, getMyOrders);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').put(auth, updateOrderToPaid);

export default router;