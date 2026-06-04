const mongoose = require('mongoose');
const { customerPriceFromBase, platformCommission } = require('../utils/pricing');
const productSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true, index: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, index: true },
  basePrice: { type: Number, required: true, min: 1 },
  commissionPercent: { type: Number, min: 10, max: 15, default: 15 },
  price: Number,
  platformCommission: Number,
  mrp: Number,
  unit: String,
  stock: { type: Number, default: 0 },
  emoji: { type: String, default: '🛒' },
  image: String,
  description: String,
  details: String,
  status: { type: String, enum: ['active','inactive','out_of_stock'], default: 'active', index: true },
  rating: { type: Number, default: 4.6 },
  deliveryEta: { type: String, default: '15-20 min' },
  tags: [String]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
productSchema.pre('save', function(next) {
  this.price = customerPriceFromBase(this.basePrice, this.commissionPercent);
  this.platformCommission = platformCommission(this.basePrice, this.commissionPercent);
  next();
});
module.exports = mongoose.model('Product', productSchema);
