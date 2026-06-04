const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const asyncHandler = require('../utils/asyncHandler');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const router = express.Router();
function razorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null;
  return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
}
router.post('/create/:order_ref', asyncHandler(async (req, res) => {
  const order = await Order.findOne({ order_ref: req.params.order_ref });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.status !== 'accepted') return res.status(400).json({ message: 'Vendor acceptance required before payment' });
  const rz = razorpay();
  if (!rz) {
    order.payment = { provider: 'demo', orderId: `demo_${order.order_ref}`, status: 'created' }; await order.save();
    return res.json({ demo: true, order_id: order.payment.orderId, amount: order.total, currency: 'INR', key: 'demo' });
  }
  const paymentOrder = await rz.orders.create({ amount: Math.round(order.total * 100), currency: 'INR', receipt: order.order_ref });
  order.payment = { provider: 'razorpay', orderId: paymentOrder.id, status: 'created' }; await order.save();
  res.json({ order_id: paymentOrder.id, amount: paymentOrder.amount, currency: paymentOrder.currency, key: process.env.RAZORPAY_KEY_ID });
}));
router.post('/verify', asyncHandler(async (req, res) => {
  const { order_ref, razorpay_order_id, razorpay_payment_id, razorpay_signature, demo } = req.body;
  const order = await Order.findOne({ order_ref });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (!demo) {
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    if (expected !== razorpay_signature) return res.status(400).json({ message: 'Invalid payment signature' });
  }
  for (const item of order.items) await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  order.payment = { ...order.payment, paymentId: razorpay_payment_id || 'demo_payment', signature: razorpay_signature, status: 'success' };
  order.pushStatus('paid', 'Payment successful. Vendor is preparing order.'); await order.save();
  await Transaction.create({ order: order._id, user: order.customer, type: 'payment', amount: order.total, status: 'success', meta: { order_ref } });
  await Transaction.create({ order: order._id, type: 'commission', amount: order.platformCommissionTotal, status: 'success', meta: { order_ref } });
  res.json({ success: true, order_ref: order.order_ref });
}));
module.exports = router;
