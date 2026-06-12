const { Schema, model } = require('mongoose');

const ReferralSchema = new Schema({
  referrerEmail: { type: String, required: true, lowercase: true, trim: true },
  referralCode:  { type: String, required: true, uppercase: true, trim: true },
  referredEmail: { type: String, required: true, lowercase: true, trim: true, unique: true },
  rewarded:      { type: Boolean, default: false },
}, { timestamps: true });

module.exports = model('Referral', ReferralSchema);
