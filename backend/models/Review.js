const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userEmail:   { type: String, required: true, lowercase: true, trim: true },
  userName:    { type: String, default: 'Customer' },
  type:        { type: String, enum: ['product','service'], required: true },
  refId:       { type: String, required: true },
  refName:     { type: String, required: true },
  rating:      { type: Number, required: true, min: 1, max: 5 },
  title:       { type: String, default: '' },
  body:        { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
