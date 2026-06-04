const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { protect, allowRoles } = require('../middleware/auth');
const Vendor = require('../models/Vendor');
const Rider = require('../models/Rider');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Dispute = require('../models/Dispute');
const Transaction = require('../models/Transaction');
const router = express.Router();
router.use(protect, allowRoles('admin'));
router.get('/dashboard', asyncHandler(async (req, res) => {
  const [orders, vendors, riders, products, revenue] = await Promise.all([
    Order.countDocuments(), Vendor.countDocuments(), Rider.countDocuments(), Product.countDocuments(), Order.aggregate([{ $match: { status: { $in: ['paid','shipped','delivered'] } } }, { $group: { _id: null, total: { $sum: '$platformCommissionTotal' } } }])
  ]);
  res.json({ orders, vendors, riders, products, platformCommission: revenue[0]?.total || 0 });
}));
router.get('/vendors', asyncHandler(async (req, res) => res.json(await Vendor.find().populate('user','name phone role').sort('-createdAt'))));
router.patch('/vendors/:id/approval', asyncHandler(async (req, res) => res.json(await Vendor.findByIdAndUpdate(req.params.id, { approvalStatus: req.body.status, commissionPercent: req.body.commissionPercent }, { new: true }))));
router.get('/riders', asyncHandler(async (req, res) => res.json(await Rider.find().populate('user','name phone role').sort('-createdAt'))));
router.patch('/riders/:id/approval', asyncHandler(async (req, res) => res.json(await Rider.findByIdAndUpdate(req.params.id, { approvalStatus: req.body.status }, { new: true }))));
router.get('/orders', asyncHandler(async (req, res) => res.json(await Order.find().populate('vendor rider').sort('-createdAt').limit(200))));
router.get('/transactions', asyncHandler(async (req, res) => res.json(await Transaction.find().sort('-createdAt').limit(200))));
router.get('/disputes', asyncHandler(async (req, res) => res.json(await Dispute.find().populate('order raisedBy').sort('-createdAt'))));
router.patch('/disputes/:id', asyncHandler(async (req, res) => res.json(await Dispute.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
module.exports = router;
