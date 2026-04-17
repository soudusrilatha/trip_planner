const Trip = require('../models/Trip');
const Hotel = require('../models/Hotel');
const Transport = require('../models/Transport');
const Booking = require('../models/Booking');

exports.getDashboard = async (req, res) => {
  try {
    const trips = await Trip.find({ createdBy: req.user._id });
    const hotels = await Hotel.find({ createdBy: req.user._id });
    const transports = await Transport.find({ createdBy: req.user._id });
    const bookings = await Booking.find().populate('user trip hotel transport').sort('-createdAt').limit(10);
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalCost, 0);
    res.render('planner/dashboard', {
      title: 'Planner Dashboard - WanderPlan',
      trips, hotels, transports, bookings, totalRevenue,
      messages: req.flash()
    });
  } catch (err) {
    req.flash('error', 'Failed to load dashboard');
    res.redirect('/');
  }
};

// TRIP CRUD
exports.getAddTrip = (req, res) => {
  res.render('planner/add-trip', { title: 'Add Trip - WanderPlan', trip: null, messages: req.flash() });
};

exports.postAddTrip = async (req, res) => {
  try {
    const { title, destination, description, days, budgetMin, budgetMax, budgetCategory, travelType, foodPreference, bestTimeToVisit, category, highlights, image } = req.body;
    const itinerary = [];
    const numDays = parseInt(days);
    for (let i = 1; i <= numDays; i++) {
      const acts = req.body[`day${i}_activities`] || '';
      itinerary.push({
        day: i,
        title: req.body[`day${i}_title`] || `Day ${i}`,
        activities: acts.split('\n').filter(a => a.trim()),
        meals: req.body[`day${i}_meals`] || '',
        notes: req.body[`day${i}_notes`] || ''
      });
    }
    await Trip.create({
      title, destination, description, days: numDays, budgetMin, budgetMax, budgetCategory,
      travelType: Array.isArray(travelType) ? travelType : [travelType],
      foodPreference: Array.isArray(foodPreference) ? foodPreference : [foodPreference],
      bestTimeToVisit, category,
      highlights: highlights ? highlights.split('\n').filter(h => h.trim()) : [],
      image: image || '',
      itinerary,
      createdBy: req.user._id
    });
    req.flash('success', 'Trip added successfully!');
    res.redirect('/planner/dashboard');
  } catch (err) {
    req.flash('error', 'Failed to add trip: ' + err.message);
    res.redirect('/planner/add-trip');
  }
};

exports.getEditTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.render('planner/add-trip', { title: 'Edit Trip - WanderPlan', trip, messages: req.flash() });
  } catch (err) {
    req.flash('error', 'Trip not found');
    res.redirect('/planner/dashboard');
  }
};

exports.postEditTrip = async (req, res) => {
  try {
    const { title, destination, description, days, budgetMin, budgetMax, budgetCategory, travelType, foodPreference, bestTimeToVisit, category, highlights, image } = req.body;
    const itinerary = [];
    const numDays = parseInt(days);
    for (let i = 1; i <= numDays; i++) {
      const acts = req.body[`day${i}_activities`] || '';
      itinerary.push({
        day: i,
        title: req.body[`day${i}_title`] || `Day ${i}`,
        activities: acts.split('\n').filter(a => a.trim()),
        meals: req.body[`day${i}_meals`] || '',
        notes: req.body[`day${i}_notes`] || ''
      });
    }
    await Trip.findByIdAndUpdate(req.params.id, {
      title, destination, description, days: numDays, budgetMin, budgetMax, budgetCategory,
      travelType: Array.isArray(travelType) ? travelType : [travelType],
      foodPreference: Array.isArray(foodPreference) ? foodPreference : [foodPreference],
      bestTimeToVisit, category,
      highlights: highlights ? highlights.split('\n').filter(h => h.trim()) : [],
      image: image || '', itinerary
    });
    req.flash('success', 'Trip updated!');
    res.redirect('/planner/dashboard');
  } catch (err) {
    req.flash('error', 'Failed to update trip');
    res.redirect('/planner/dashboard');
  }
};

exports.deleteTrip = async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  req.flash('success', 'Trip deleted!');
  res.redirect('/planner/dashboard');
};

// HOTEL CRUD
exports.getAddHotel = (req, res) => {
  res.render('planner/add-hotel', { title: 'Add Hotel - WanderPlan', hotel: null, messages: req.flash() });
};

exports.postAddHotel = async (req, res) => {
  try {
    const { name, location, destination, description, pricePerNight, category, rating, amenities, contactNumber, address, totalRooms, image } = req.body;
    await Hotel.create({
      name, location, destination, description, pricePerNight, category, rating, contactNumber, address, totalRooms: totalRooms || 50,
      availableRooms: totalRooms || 50,
      amenities: amenities ? amenities.split(',').map(a => a.trim()) : [],
      image: image || '',
      createdBy: req.user._id
    });
    req.flash('success', 'Hotel added successfully!');
    res.redirect('/planner/dashboard');
  } catch (err) {
    req.flash('error', 'Failed to add hotel: ' + err.message);
    res.redirect('/planner/add-hotel');
  }
};

exports.getEditHotel = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.render('planner/add-hotel', { title: 'Edit Hotel', hotel, messages: req.flash() });
};

exports.postEditHotel = async (req, res) => {
  try {
    const { name, location, destination, description, pricePerNight, category, rating, amenities, contactNumber, address, totalRooms, image } = req.body;
    await Hotel.findByIdAndUpdate(req.params.id, {
      name, location, destination, description, pricePerNight, category, rating, contactNumber, address, totalRooms,
      amenities: amenities ? amenities.split(',').map(a => a.trim()) : [],
      image: image || ''
    });
    req.flash('success', 'Hotel updated!');
    res.redirect('/planner/dashboard');
  } catch (err) {
    req.flash('error', 'Failed to update hotel');
    res.redirect('/planner/dashboard');
  }
};

exports.deleteHotel = async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  req.flash('success', 'Hotel deleted!');
  res.redirect('/planner/dashboard');
};

// TRANSPORT CRUD
exports.getAddTransport = (req, res) => {
  res.render('planner/add-transport', { title: 'Add Transport - WanderPlan', transport: null, messages: req.flash() });
};

exports.postAddTransport = async (req, res) => {
  try {
    const { name, type, from, to, destination, cost, duration, departure, arrival, description, features } = req.body;
    await Transport.create({
      name, type, from, to, destination, cost, duration, departure, arrival, description,
      features: features ? features.split(',').map(f => f.trim()) : [],
      createdBy: req.user._id
    });
    req.flash('success', 'Transport added successfully!');
    res.redirect('/planner/dashboard');
  } catch (err) {
    req.flash('error', 'Failed to add transport: ' + err.message);
    res.redirect('/planner/add-transport');
  }
};

exports.getEditTransport = async (req, res) => {
  const transport = await Transport.findById(req.params.id);
  res.render('planner/add-transport', { title: 'Edit Transport', transport, messages: req.flash() });
};

exports.postEditTransport = async (req, res) => {
  try {
    const { name, type, from, to, destination, cost, duration, departure, arrival, description, features } = req.body;
    await Transport.findByIdAndUpdate(req.params.id, {
      name, type, from, to, destination, cost, duration, departure, arrival, description,
      features: features ? features.split(',').map(f => f.trim()) : []
    });
    req.flash('success', 'Transport updated!');
    res.redirect('/planner/dashboard');
  } catch (err) {
    req.flash('error', 'Failed to update transport');
    res.redirect('/planner/dashboard');
  }
};

exports.deleteTransport = async (req, res) => {
  await Transport.findByIdAndDelete(req.params.id);
  req.flash('success', 'Transport deleted!');
  res.redirect('/planner/dashboard');
};
