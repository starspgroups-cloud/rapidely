const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { protect, allowRoles } = require('../middleware/auth');
const Rider = require('../models/Rider');
const Order = require('../models/Order');
const { riderDailyEarning } = require('../utils/pricing');
const router = express.Router();
router.post('/register', protect, asyncHandler(async (req, res) => {
  const rider = await Rider.findOneAndUpdate({ user: req.user._id }, { $set: { ...req.body, user: req.user._id, phone: req.user.phone, name: req.body.name || req.user.name } }, { upsert: true, new: true });
  res.status(201).json({ message: 'Rider registration submitted for admin approval', rider });
}));
router.use(protect, allowRoles('rider','admin'));
router.patch('/online', asyncHandler(async (req, res) => res.json(await Rider.findOneAndUpdate({ user: req.user._id }, { online: !!req.body.online, currentLocation: req.body.location }, { new: true }))));
router.get('/tasks', asyncHandler(async (req, res) => res.json(await Order.find({ status: { $in: ['paid','ready'] }, delivery_type: 'delivery', rider: { $exists: false } }).sort('createdAt').limit(20))));
router.post('/tasks/:order_ref/accept', asyncHandler(async (req, res) => {
  const rider = await Rider.findOne({ user: req.user._id, approvalStatus: 'approved' });
  if (!rider) return res.status(403).json({ message: 'Rider approval required' });
  const order = await Order.findOne({ order_ref: req.params.order_ref, rider: { $exists: false }, status: { $in: ['paid','ready'] } });
  if (!order) return res.status(404).json({ message: 'Task not available' });
  order.rider = rider._id; order.riderEarning = Number(process.env.RIDER_ORDER_EARNING || 30); order.pushStatus('shipped', 'Rider accepted and started delivery'); await order.save();
  res.json(order);
}));
router.post('/tasks/:order_ref/delivered', asyncHandler(async (req, res) => {
  const rider = await Rider.findOne({ user: req.user._id });
  const order = await Order.findOne({ order_ref: req.params.order_ref, rider: rider._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.pushStatus('delivered', 'Order delivered successfully'); await order.save();
  rider.completedToday += 1; rider.totalCompleted += 1; rider.payoutDue += Number(process.env.RIDER_ORDER_EARNING || 30); await rider.save();
  res.json({ order, earning: riderDailyEarning(rider.completedToday) });
}));
router.get('/earnings', asyncHandler(async (req, res) => {
  const rider = await Rider.findOne({ user: req.user._id });
  res.json({ completedToday: rider.completedToday, payoutDue: rider.payoutDue, earning: riderDailyEarning(rider.completedToday) });
}));
module.exports = router;
