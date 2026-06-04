const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Product = require('../models/Product');
const router = express.Router();
function mapProduct(p) { return { id: String(p._id), name: p.name, price: p.price, mrp: p.mrp, category: p.category, emoji: p.emoji || '🛒', image: p.image || '/products/atta.svg', description: p.description, details: p.details, unit: p.unit, stock: p.stock, rating: p.rating, deliveryEta: p.deliveryEta, tags: p.tags }; }
router.get('/', asyncHandler(async (req, res) => {
  const { q, category } = req.query;
  const filter = { status: 'active', stock: { $gt: 0 } };
  if (category && category !== 'All') filter.category = category;
  if (q) filter.name = { $regex: q, $options: 'i' };
  const products = await Product.find(filter).sort('-createdAt').limit(100);
  res.json(products.map(mapProduct));
}));
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const related = await Product.find({ _id: { $ne: product._id }, category: product.category, status: 'active' }).limit(6);
  res.json({ product: mapProduct(product), related: related.map(mapProduct) });
}));
module.exports = router;
