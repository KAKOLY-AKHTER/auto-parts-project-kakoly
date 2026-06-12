const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true, lowercase: true, trim: true },
  userName:  { type: String, default: '' },
  items: [{
    id:       mongoose.Schema.Types.Mixed,
    name:     String,
    price:    Number,
    qty:      Number,
    img:      String,
    catLabel: String,
  }],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  tax:      { type: Number, default: 0 },
  total:    { type: Number, required: true },
  status:   { type: String, default: 'pending', enum: ['pending','processing','shipped','delivered','cancelled'] },
  address:        { type: String, default: '' },
  phone:          { type: String, default: '' },
  trackingNumber: { type: String, default: '' },
  trackingUrl:    { type: String, default: '' },
  courier:        { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
