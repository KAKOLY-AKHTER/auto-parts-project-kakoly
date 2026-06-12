const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  cat:        { type: String, default: '' },
  catLabel:   { type: String, default: '' },
  desc:       { type: String, default: '' },
  price:      { type: Number, required: true, min: 0 },
  oldPrice:   { type: Number, default: 0 },
  img:        { type: String, default: '' },
  brand:      { type: String, default: '' },
  rating:     { type: Number, default: 0 },
  reviews:    { type: Number, default: 0 },
  tag:        { type: String, default: null },
  badge:      { type: String, default: null },
  features:   [String],
  specs:      { type: mongoose.Schema.Types.Mixed, default: {} },
  compat:     [String],
  stock:      { type: Number, default: 100, min: 0 },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
