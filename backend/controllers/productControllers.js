import productModel from '../models/productModel.js';
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};
    const products = await productModel.find({ ...keyword });
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

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new productModel({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save();
    res.status(201).send(createdProduct);
})

const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await productModel.findById(req.params.id);
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save();
        res.send(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
})

const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await productModel.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() ===
            req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).send({ message: 'Review added' });
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(3);
    res.send(products);
})

export {
    getProducts, getProductById, deleteProduct, createProduct, updateProduct,
    createProductReview, getTopProducts
}