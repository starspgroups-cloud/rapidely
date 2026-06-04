const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { protect, allowRoles } = require('../middleware/auth');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const Order = require('../models/Order');
const router = express.Router();
router.post('/register', protect, asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOneAndUpdate({ user: req.user._id }, { $set: { ...req.body, user: req.user._id, phone: req.user.phone, ownerName: req.body.ownerName || req.user.name } }, { upsert: true, new: true });
  res.status(201).json({ message: 'Vendor registration submitted for admin approval', vendor });
}));
router.use(protect, allowRoles('vendor','admin'));
router.get('/me', asyncHandler(async (req, res) => res.json(await Vendor.findOne({ user: req.user._id }))));
router.post('/products', asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user._id });
  if (!vendor || vendor.approvalStatus !== 'approved') return res.status(403).json({ message: 'Vendor approval required' });
  const product = await Product.create({ ...req.body, vendor: vendor._id, commissionPercent: vendor.commissionPercent });
  res.status(201).json(product);
}));
router.patch('/products/:id', asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user._id });
  const product = await Product.findOneAndUpdate({ _id: req.params.id, vendor: vendor._id }, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.save();
  res.json(product);
}));
router.get('/orders', asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user._id });
  const orders = await Order.find({ vendor: vendor._id }).sort('-createdAt');
  res.json(orders);
}));
router.post('/orders/:order_ref/accept', asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user._id });
  const order = await Order.findOne({ order_ref: req.params.order_ref, vendor: vendor._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.pushStatus('accepted', 'Vendor accepted the order. Payment is now enabled.'); await order.save();
  res.json(order);
}));
router.post('/orders/:order_ref/decline', asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user._id });
  const order = await Order.findOne({ order_ref: req.params.order_ref, vendor: vendor._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.pushStatus('declined', req.body.reason || 'Vendor declined the order'); await order.save();
  res.json(order);
}));
module.exports = router;
