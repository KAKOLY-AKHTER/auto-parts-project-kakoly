const { Schema, model } = require('mongoose');

const settingsSchema = new Schema({
  key:   { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

module.exports = model('Settings', settingsSchema);
