const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  transport: { type: mongoose.Schema.Types.ObjectId, ref: 'Transport' },
  bookingType: { type: String, enum: ['trip', 'hotel', 'transport'], required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  guests: { type: Number, default: 1 },
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'paid' },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
