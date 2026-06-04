const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  phone: { type: String, required: true, unique: true, index: true },
  email: { type: String, trim: true, lowercase: true },
  role: { type: String, enum: ['customer','vendor','rider','admin'], default: 'customer', index: true },
  otpCode: String,
  otpExpiresAt: Date,
  isActive: { type: Boolean, default: true },
  fcmTokens: [String]
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
