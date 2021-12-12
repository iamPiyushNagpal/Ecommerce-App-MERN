import express from 'express';
const router = express.Router();
import {
    addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered,
    updateOrderToPaid
} from '../controllers/orderControllers.js';
import { auth, adminAuth } from '../middleware/authMiddleware.js';

router.route('/').post(auth, addOrderItems).get(auth, adminAuth, getOrders);
router.route('/myorders').get(auth, getMyOrders);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').put(auth, updateOrderToPaid);
router.route('/:id/deliver').put(auth, adminAuth, updateOrderToDelivered);

export default router;