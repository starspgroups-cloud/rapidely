const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  shopName: { type: String, required: true },
  ownerName: String,
  phone: String,
  category: String,
  address: String,
  location: { lat: Number, lng: Number },
  kyc: { gst: String, pan: String, aadhaar: String, documents: [String] },
  approvalStatus: { type: String, enum: ['pending','approved','rejected','suspended'], default: 'pending', index: true },
  commissionPercent: { type: Number, default: () => Number(process.env.PLATFORM_COMMISSION_DEFAULT || 15), min: 10, max: 15 },
  trustScore: { type: Number, default: 80 },
  shopOpen: { type: Boolean, default: true },
  payoutDue: { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('Vendor', vendorSchema);
