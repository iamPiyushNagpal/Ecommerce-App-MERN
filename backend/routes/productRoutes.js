import express from 'express';
const router = express.Router();
import {
    getProducts, getProductById, deleteProduct, updateProduct, createProduct,
    createProductReview
} from '../controllers/productControllers.js';
import { auth, adminAuth } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getProducts)
    .post(auth, adminAuth, createProduct);

router.route('/:id/reviews').post(auth, createProductReview);

router.route('/:id')
    .get(getProductById)
    .delete(auth, adminAuth, deleteProduct)
    .put(auth, adminAuth, updateProduct);

export default router;