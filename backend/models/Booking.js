const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    service: { type: String, required: true },
    vehicle: { type: String, default: '' },
    date:    { type: Date, required: true },
    time:    { type: String, default: '' },
    notes:   { type: String, default: '' },
    status:  { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
