const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
  label:     { type: String, default: 'Home' },
  name:      { type: String, required: true },
  phone:     { type: String, default: '' },
  line1:     { type: String, required: true },
  line2:     { type: String, default: '' },
  city:      { type: String, required: true },
  state:     { type: String, default: '' },
  zip:       { type: String, required: true },
  country:   { type: String, default: 'US' },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
