const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const { generateOtp, isOtpValid } = require('../utils/otp');
const router = express.Router();

function sign(user) { return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '30d' }); }

router.post('/request-otp', asyncHandler(async (req, res) => {
  const { phone, role = 'customer', name, email } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone is required' });
  const otp = generateOtp();
  const user = await User.findOneAndUpdate({ phone }, { $set: { role, name, email, otpCode: otp, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) } }, { upsert: true, new: true });
  await Wallet.findOneAndUpdate({ user: user._id }, { $setOnInsert: { balance: 0, cashback: 0 } }, { upsert: true });
  console.log(`RapiDely OTP for ${phone}: ${otp}`);
  res.json({ success: true, message: 'OTP sent', dev_otp: process.env.NODE_ENV === 'production' ? undefined : otp });
}));

router.post('/verify-otp', asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });
  if (!user || !user.otpCode) return res.status(400).json({ message: 'OTP not requested' });
  if (user.otpExpiresAt < new Date()) return res.status(400).json({ message: 'OTP expired' });
  if (!isOtpValid(otp, user.otpCode)) return res.status(400).json({ message: 'Invalid OTP' });
  user.otpCode = undefined; user.otpExpiresAt = undefined; await user.save();
  res.json({ token: sign(user), user: { id: user._id, name: user.name, phone: user.phone, role: user.role } });
}));

module.exports = router;
