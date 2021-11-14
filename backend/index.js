import express from 'express';
import products from './data/products.js';
import './config/env.js';
import './database/db.js';
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