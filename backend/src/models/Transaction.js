const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['payment','commission','vendor_payout','rider_payout','refund','wallet_credit','wallet_debit'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending','success','failed'], default: 'pending' },
  meta: Object
}, { timestamps: true });
module.exports = mongoose.model('Transaction', schema);
