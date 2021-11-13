import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.get('/api/products', (req, res) => {
    res.send(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.send(product);
})

app.listen(port, () => console.log(`Server started spinning on port ${port}`));