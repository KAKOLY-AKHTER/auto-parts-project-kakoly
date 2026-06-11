const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
  userName:  { type: String, default: 'Customer' },
  subject:   { type: String, required: true },
  status:    { type: String, enum: ['open','replied','closed'], default: 'open' },
  messages:  [{
    sender:    { type: String, enum: ['user','admin'], default: 'user' },
    text:      { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
