const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true, lowercase: true, trim: true },
  year:      { type: Number, required: true },
  make:      { type: String, required: true, trim: true },
  model:     { type: String, required: true, trim: true },
  trim:      { type: String, default: '', trim: true },
  plate:     { type: String, default: '', trim: true },
  vin:       { type: String, default: '', trim: true },
  mileage:   { type: String, default: '' },
  color:     { type: String, default: '#e30613' },
  tireSize:  { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
