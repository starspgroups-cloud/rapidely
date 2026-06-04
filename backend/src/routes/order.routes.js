const express = require('express');
const { v4: uuid } = require('uuid');
const asyncHandler = require('../utils/asyncHandler');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { generateOtp, isOtpValid } = require('../utils/otp');
const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { items = [], customer = {}, delivery_type = 'delivery', discount = 0 } = req.body;
  if (!items.length) return res.status(400).json({ message: 'Cart is empty' });
  if (!customer.phone) return res.status(400).json({ message: 'Phone is required' });
  const user = await User.findOneAndUpdate({ phone: customer.phone }, { $set: { name: customer.name, email: customer.email, role: 'customer' } }, { upsert: true, new: true });
  const productIds = items.map(i => i.product_id);
  const products = await Product.find({ _id: { $in: productIds } });
  const vendorId = products[0]?.vendor;
  const orderItems = items.map(i => {
    const p = products.find(x => String(x._id) === String(i.product_id));
    if (!p) throw new Error('Product missing');
    if (p.stock < i.quantity) throw new Error(`${p.name} stock not available`);
    return { product: p._id, vendor: p.vendor, name: p.name, quantity: i.quantity, basePrice: p.basePrice, price: p.price, commission: p.platformCommission * i.quantity, vendorAmount: p.basePrice * i.quantity };
  });
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery_charge = delivery_type === 'delivery' ? Number(process.env.DELIVERY_FEE || 40) : 0;
  const total = Math.max(0, subtotal + delivery_charge - Number(discount || 0));
  const otp = generateOtp();
  const order = await Order.create({ order_ref: `RD${Date.now().toString().slice(-8)}${uuid().slice(0,4).toUpperCase()}`, customer: user._id, customerInfo: customer, vendor: vendorId, items: orderItems, delivery_type, subtotal, delivery_charge, discount, total, platformCommissionTotal: orderItems.reduce((s,i)=>s+i.commission,0), vendorPayout: orderItems.reduce((s,i)=>s+i.vendorAmount,0), otpCode: otp, otpExpiresAt: new Date(Date.now()+10*60*1000), eta: '20-35 minutes', statusHistory: [{ status: 'pending_otp', note: 'OTP sent to customer' }] });
  await Notification.create({ role: 'vendor', title: 'New order waiting', body: `${order.order_ref} needs OTP verification`, data: { order_ref: order.order_ref } });
  console.log(`Order OTP ${order.order_ref}: ${otp}`);
  res.status(201).json({ order_ref: order.order_ref, message: 'OTP sent. Demo OTP visible in backend terminal.', dev_otp: process.env.NODE_ENV === 'production' ? undefined : otp });
}));

router.post('/verify', asyncHandler(async (req, res) => {
  const order = await Order.findOne({ order_ref: req.body.order_ref });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (!isOtpValid(req.body.otp, order.otpCode)) return res.status(400).json({ message: 'Invalid OTP' });
  order.otpCode = undefined; order.otpExpiresAt = undefined; order.pushStatus('verified', 'Customer OTP verified. Sent to vendor.'); await order.save();
  res.json({ success: true, order_ref: order.order_ref });
}));

router.post('/resend-otp', asyncHandler(async (req, res) => {
  const order = await Order.findOne({ order_ref: req.body.order_ref });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.otpCode = generateOtp(); order.otpExpiresAt = new Date(Date.now()+10*60*1000); await order.save();
  console.log(`Resent OTP ${order.order_ref}: ${order.otpCode}`);
  res.json({ success: true, message: 'OTP resent' });
}));
module.exports = router;
