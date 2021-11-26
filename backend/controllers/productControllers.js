import productModel from '../models/productModel.js';
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find({});
    res.send(products);
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product)
        res.send(product);
    else {
        res.status(404);
        throw new Error('Product not found');
    }
})

export { getProducts, getProductById }