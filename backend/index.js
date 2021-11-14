import express from 'express';
import './config/env.js';
import './database/db.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT;

const app = express();

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server started spinning on port ${port}`));