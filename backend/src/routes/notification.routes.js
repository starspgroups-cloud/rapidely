const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const Notification = require('../models/Notification');
const getFirebase = require('../config/firebase');
const router = express.Router();
router.use(protect);
router.get('/', asyncHandler(async (req, res) => res.json(await Notification.find({ $or: [{ user: req.user._id }, { role: req.user.role }] }).sort('-createdAt').limit(50))));
router.post('/fcm-token', asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $addToSet: { fcmTokens: req.body.token } });
  res.json({ success: true });
}));

router.post('/send-test', asyncHandler(async (req, res) => {
  const title = req.body.title || 'RapiDely update';
  const body = req.body.body || 'Your notification system is ready.';
  await Notification.create({ user: req.user._id, role: req.user.role, title, body, type: 'system' });
  const firebase = getFirebase();
  if (firebase && req.user.fcmTokens?.length) {
    await firebase.messaging().sendEachForMulticast({ tokens: req.user.fcmTokens, notification: { title, body } });
  }
  req.app.get('io')?.to(`role:${req.user.role}`).emit('notification', { title, body });
  res.json({ success: true, title, body });
}));
module.exports = router;
