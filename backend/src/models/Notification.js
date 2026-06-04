const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  role: { type: String, enum: ['customer','vendor','rider','admin'] },
  title: String,
  body: String,
  data: Object,
  read: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Notification', schema);
