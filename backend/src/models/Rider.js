const mongoose = require('mongoose');
const riderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: String,
  phone: String,
  vehicleType: { type: String, enum: ['bike','cycle','scooter'], default: 'bike' },
  approvalStatus: { type: String, enum: ['pending','approved','rejected','suspended'], default: 'pending', index: true },
  online: { type: Boolean, default: false },
  currentLocation: { lat: Number, lng: Number },
  completedToday: { type: Number, default: 0 },
  totalCompleted: { type: Number, default: 0 },
  rating: { type: Number, default: 4.8 },
  payoutDue: { type: Number, default: 0 },
  kyc: { aadhaar: String, license: String, documents: [String] }
}, { timestamps: true });
module.exports = mongoose.model('Rider', riderSchema);
