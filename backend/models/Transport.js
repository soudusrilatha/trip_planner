const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['flight', 'train', 'bus', 'cab', 'bike-rental', 'car-rental', 'ferry'], required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  destination: { type: String, required: true },
  cost: { type: Number, required: true },
  duration: { type: String, required: true },
  departure: { type: String },
  arrival: { type: String },
  description: { type: String },
  features: [String],
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transport', transportSchema);
