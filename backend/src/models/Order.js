const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  name: String,
  quantity: Number,
  basePrice: Number,
  price: Number,
  commission: Number,
  vendorAmount: Number
}, { _id: false });
const orderSchema = new mongoose.Schema({
  order_ref: { type: String, required: true, unique: true, index: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerInfo: { name: String, email: String, phone: String, notes: String, address: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', index: true },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
  items: [orderItemSchema],
  delivery_type: { type: String, enum: ['delivery','pickup'], default: 'delivery' },
  subtotal: Number,
  delivery_charge: Number,
  discount: { type: Number, default: 0 },
  total: Number,
  platformCommissionTotal: Number,
  vendorPayout: Number,
  riderEarning: { type: Number, default: 0 },
  status: { type: String, enum: ['pending_otp','verified','accepted','declined','paid','ready','assigned','shipped','delivered','cancelled','refunded'], default: 'pending_otp', index: true },
  payment: { provider: String, orderId: String, paymentId: String, signature: String, status: { type: String, default: 'pending' } },
  otpCode: String,
  otpExpiresAt: Date,
  shipping_info: String,
  eta: String,
  statusHistory: [{ status: String, note: String, at: { type: Date, default: Date.now } }]
}, { timestamps: true });
orderSchema.methods.pushStatus = function(status, note) { this.status = status; this.statusHistory.push({ status, note }); };
module.exports = mongoose.model('Order', orderSchema);
