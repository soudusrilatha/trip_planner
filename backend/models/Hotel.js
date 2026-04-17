const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String },
  pricePerNight: { type: Number, required: true },
  category: { type: String, enum: ['budget', 'mid-range', 'luxury'], default: 'mid-range' },
  rating: { type: Number, default: 4.0 },
  amenities: [String],
  image: { type: String, default: '' },
  contactNumber: { type: String },
  address: { type: String },
  totalRooms: { type: Number, default: 50 },
  availableRooms: { type: Number, default: 50 },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', hotelSchema);
