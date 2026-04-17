const Trip = require('../models/Trip');
const Hotel = require('../models/Hotel');
const Transport = require('../models/Transport');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

exports.getHome = async (req, res) => {
  try {
    const featuredTrips = await Trip.find({ isActive: true }).sort('-totalBookings').limit(6);
    const destinations = [...new Set((await Trip.find({ isActive: true })).map(t => t.destination))];
    res.render('traveler/home', {
      title: 'WanderPlan - Your AI Travel Companion',
      featuredTrips, destinations, messages: req.flash()
    });
  } catch (err) {
    res.render('traveler/home', { title: 'WanderPlan', featuredTrips: [], destinations: [], messages: req.flash() });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const { destination, budget, days, type, food, sort } = req.query;
    let filter = { isActive: true };
    if (destination) filter.destination = new RegExp(destination, 'i');
    if (budget) {
      if (budget === 'budget') filter.budgetMax = { $lte: 15000 };
      if (budget === 'mid-range') { filter.budgetMin = { $gte: 15000 }; filter.budgetMax = { $lte: 50000 }; }
      if (budget === 'luxury') filter.budgetMin = { $gte: 50000 };
    }
    if (days) filter.days = { $lte: parseInt(days) };
    if (type) filter.travelType = type;
    if (food) filter.foodPreference = food;
    let sortObj = { createdAt: -1 };
    if (sort === 'rating') sortObj = { rating: -1 };
    if (sort === 'price-low') sortObj = { budgetMin: 1 };
    if (sort === 'price-high') sortObj = { budgetMin: -1 };
    const trips = await Trip.find(filter).sort(sortObj);
    res.render('traveler/trips', {
      title: 'Browse Trips - WanderPlan',
      trips, query: req.query, messages: req.flash()
    });
  } catch (err) {
    res.render('traveler/trips', { title: 'Browse Trips', trips: [], query: {}, messages: req.flash() });
  }
};

exports.getTripDetail = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('createdBy', 'name');
    const hotels = await Hotel.find({ destination: new RegExp(trip.destination, 'i'), isActive: true });
    const transports = await Transport.find({ destination: new RegExp(trip.destination, 'i'), isActive: true });
    const reviews = await Review.find({ trip: trip._id }).populate('user', 'name').sort('-createdAt');
    const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : trip.rating;
    res.render('traveler/trip-detail', {
      title: `${trip.title} - WanderPlan`,
      trip, hotels, transports, reviews, avgRating, messages: req.flash()
    });
  } catch (err) {
    req.flash('error', 'Trip not found');
    res.redirect('/traveler/trips');
  }
};

exports.getPlanTrip = (req, res) => {
  res.render('traveler/plan-trip', { title: 'Plan Your Trip - WanderPlan', plan: null, messages: req.flash() });
};

exports.postPlanTrip = async (req, res) => {
  try {
    const { destination, days, budget, travelType, foodPreference } = req.body;
    const trips = await Trip.find({
      destination: new RegExp(destination, 'i'),
      isActive: true
    });

    let budgetNum = parseInt(budget);
    let budgetCategory = 'mid-range';
    if (budgetNum <= 15000) budgetCategory = 'budget';
    else if (budgetNum >= 50000) budgetCategory = 'luxury';

    const hotels = await Hotel.find({ destination: new RegExp(destination, 'i'), category: budgetCategory, isActive: true }).limit(3);
    const transports = await Transport.find({ destination: new RegExp(destination, 'i'), isActive: true }).limit(4);

    const estimatedAccommodation = (hotels[0]?.pricePerNight || 2000) * parseInt(days);
    const estimatedFood = parseInt(days) * (budgetCategory === 'budget' ? 500 : budgetCategory === 'mid-range' ? 1200 : 2500) * (travelType === 'family' ? 4 : travelType === 'friends' ? 3 : 1);
    const estimatedTransport = transports[0]?.cost || 3000;
    const estimatedActivities = parseInt(days) * (budgetCategory === 'budget' ? 500 : 1500);
    const totalEstimate = estimatedAccommodation + estimatedFood + estimatedTransport + estimatedActivities;

    const plan = {
      destination, days: parseInt(days), budget: budgetNum, budgetCategory,
      travelType, foodPreference, trips,
      hotels, transports,
      costBreakdown: { accommodation: estimatedAccommodation, food: estimatedFood, transport: estimatedTransport, activities: estimatedActivities, total: totalEstimate },
      tips: getTravelTips(destination, travelType),
      localFood: getLocalFood(destination, foodPreference)
    };

    res.render('traveler/plan-trip', { title: 'Your Travel Plan - WanderPlan', plan, messages: req.flash() });
  } catch (err) {
    req.flash('error', 'Failed to generate plan');
    res.redirect('/traveler/plan-trip');
  }
};

exports.postBooking = async (req, res) => {
  try {
    const { tripId, hotelId, transportId, bookingType, checkIn, checkOut, guests, specialRequests } = req.body;
    let totalCost = 0;
    let bookingData = { user: req.user._id, bookingType, guests: guests || 1, specialRequests };
    if (bookingType === 'hotel' && hotelId) {
      const hotel = await Hotel.findById(hotelId);
      const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
      totalCost = hotel.pricePerNight * nights * (guests || 1);
      bookingData.hotel = hotelId;
      bookingData.checkIn = checkIn;
      bookingData.checkOut = checkOut;
    } else if (bookingType === 'transport' && transportId) {
      const transport = await Transport.findById(transportId);
      totalCost = transport.cost * (guests || 1);
      bookingData.transport = transportId;
    } else if (bookingType === 'trip' && tripId) {
      const trip = await Trip.findById(tripId);
      totalCost = trip.budgetMin;
      bookingData.trip = tripId;
      await Trip.findByIdAndUpdate(tripId, { $inc: { totalBookings: 1 } });
    }
    bookingData.totalCost = totalCost;
    await Booking.create(bookingData);
    req.flash('success', 'Booking confirmed! 🎉');
    res.redirect('/traveler/bookings');
  } catch (err) {
    req.flash('error', 'Booking failed: ' + err.message);
    res.redirect('/traveler/trips');
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('trip hotel transport').sort('-createdAt');
    res.render('traveler/bookings', { title: 'My Bookings - WanderPlan', bookings, messages: req.flash() });
  } catch (err) {
    res.render('traveler/bookings', { title: 'My Bookings', bookings: [], messages: req.flash() });
  }
};

exports.postReview = async (req, res) => {
  try {
    const { tripId, rating, comment } = req.body;
    const existing = await Review.findOne({ user: req.user._id, trip: tripId });
    if (existing) {
      await Review.findByIdAndUpdate(existing._id, { rating, comment });
    } else {
      await Review.create({ user: req.user._id, trip: tripId, rating, comment });
    }
    req.flash('success', 'Review submitted!');
    res.redirect(`/traveler/trips/${tripId}`);
  } catch (err) {
    req.flash('error', 'Failed to submit review');
    res.redirect('/traveler/trips');
  }
};

exports.cancelBooking = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
  req.flash('success', 'Booking cancelled');
  res.redirect('/traveler/bookings');
};

function getTravelTips(destination, travelType) {
  const baseTips = [
    '📋 Always carry a copy of your ID and booking documents',
    '💊 Pack a basic first-aid kit and any personal medications',
    '📱 Download offline maps of the destination',
    '💳 Keep multiple payment options (cash + card)',
    '🔒 Use lockers for valuables at hotels',
    '☀️ Apply sunscreen and stay hydrated especially in summer',
    '📸 Respect local customs when photographing sacred sites',
    '🗣️ Learn a few basic phrases in the local language',
  ];
  if (travelType === 'family') baseTips.push('👨‍👩‍👧 Book family rooms in advance', '🧒 Keep emergency contacts saved on kids\' phones');
  if (travelType === 'solo') baseTips.push('🌐 Join travel groups or hostels to meet fellow travelers', '📡 Share your itinerary with someone back home');
  return baseTips;
}

function getLocalFood(destination, preference) {
  const foodMap = {
    'Goa': { veg: ['Goan Vegetable Curry', 'Bebinca (sweet)', 'Poha'], 'non-veg': ['Fish Curry Rice', 'Prawn Balchao', 'Goan Sausage'], any: ['Susegad Thali', 'Cafreal Chicken', 'Feni cocktail'] },
    'Rajasthan': { veg: ['Dal Baati Churma', 'Ghewar', 'Pyaaz Kachori'], 'non-veg': ['Laal Maas', 'Safed Maas', 'Jungli Maas'], any: ['Rajasthani Thali', 'Ker Sangri', 'Gatte ki Sabzi'] },
    'Manali': { veg: ['Siddu', 'Dham', 'Chha Gosht (veg version)'], 'non-veg': ['Trout Fish', 'Chha Gosht', 'Tibetan Momos'], any: ['Thukpa', 'Maggi with cheese', 'Apple products'] },
    'Kerala': { veg: ['Puttu Kadala', 'Avial', 'Kerala Sadya'], 'non-veg': ['Kerala Fish Curry', 'Karimeen Fry', 'Crab Roast'], any: ['Appam with Stew', 'Toddy', 'Banana Chips'] },
    'Andaman': { veg: ['Coconut Rice', 'Fresh Tropical Fruits'], 'non-veg': ['Lobster', 'Grilled Barracuda', 'Prawn Curry'], any: ['Seafood Platter', 'Red Snapper Fry', 'Coconut Water'] },
  };
  const dest = Object.keys(foodMap).find(k => destination && destination.toLowerCase().includes(k.toLowerCase()));
  if (!dest) return ['🍛 Try authentic local cuisine', '🥤 Stay hydrated with fresh juices', '🧆 Explore local street food markets'];
  return foodMap[dest][preference] || foodMap[dest]['any'] || [];
}
