const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Order = require('../models/Order');
const router = express.Router();
router.get('/:order_ref', asyncHandler(async (req, res) => {
  const order = await Order.findOne({ order_ref: req.params.order_ref }).populate('rider');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ order_ref: order.order_ref, status: order.status === 'pending_otp' ? 'verified' : order.status, customer_name: order.customerInfo?.name, total: order.total, payment_url: order.payment?.orderId ? `/api/payment/${order.order_ref}` : `${process.env.CLIENT_URL || 'http://localhost:5173'}/#/track/${order.order_ref}?paid=success`, shipping_info: order.shipping_info, eta: order.eta, updated_at: order.updatedAt, rider_name: order.rider?.name, rider_phone: order.rider?.phone });
}));
module.exports = router;
