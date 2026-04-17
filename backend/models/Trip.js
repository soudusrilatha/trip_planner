const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  day: Number,
  title: String,
  activities: [String],
  meals: String,
  notes: String
});

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String, required: true },
  days: { type: Number, required: true },
  budgetMin: { type: Number, required: true },
  budgetMax: { type: Number, required: true },
  budgetCategory: { type: String, enum: ['budget', 'mid-range', 'luxury'], default: 'mid-range' },
  travelType: [{ type: String, enum: ['solo', 'family', 'friends', 'couple'] }],
  foodPreference: [{ type: String, enum: ['veg', 'non-veg', 'any'] }],
  image: { type: String, default: '' },
  highlights: [String],
  itinerary: [itineraryDaySchema],
  bestTimeToVisit: { type: String },
  category: { type: String, enum: ['beach', 'adventure', 'heritage', 'nature', 'city'], default: 'nature' },
  rating: { type: Number, default: 4.0 },
  totalBookings: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
