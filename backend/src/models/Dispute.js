const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reason: String,
  status: { type: String, enum: ['open','reviewing','resolved','rejected'], default: 'open' },
  resolution: String
}, { timestamps: true });
module.exports = mongoose.model('Dispute', schema);
