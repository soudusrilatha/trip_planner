const express = require('express');
const router = express.Router();
const traveler = require('../controllers/travelerController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/home', traveler.getHome);
router.get('/trips', traveler.getTrips);
router.get('/trips/:id', traveler.getTripDetail);
router.get('/plan-trip', traveler.getPlanTrip);
router.post('/plan-trip', traveler.postPlanTrip);

router.post('/book', authMiddleware, traveler.postBooking);
router.get('/bookings', authMiddleware, traveler.getBookings);
router.post('/bookings/cancel/:id', authMiddleware, traveler.cancelBooking);
router.post('/review', authMiddleware, traveler.postReview);

module.exports = router;
