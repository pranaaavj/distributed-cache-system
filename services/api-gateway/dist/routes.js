import express from 'express';
import { getProducts } from './controller.js';
const router = express.Router();
router.get('/products', getProducts);
