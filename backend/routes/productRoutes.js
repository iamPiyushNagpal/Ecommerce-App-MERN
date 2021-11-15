import express from 'express';
import productModel from '../models/productModel.js';
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const products = await productModel.find({});
    res.send(products);
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product)
        res.send(product);
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}))

export default router;