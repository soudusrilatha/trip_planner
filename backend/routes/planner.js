const express = require('express');
const router = express.Router();
const planner = require('../controllers/plannerController');
const { authMiddleware } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware, roleMiddleware('planner'));

router.get('/dashboard', planner.getDashboard);

router.get('/add-trip', planner.getAddTrip);
router.post('/add-trip', planner.postAddTrip);
router.get('/edit-trip/:id', planner.getEditTrip);
router.post('/edit-trip/:id', planner.postEditTrip);
router.post('/delete-trip/:id', planner.deleteTrip);

router.get('/add-hotel', planner.getAddHotel);
router.post('/add-hotel', planner.postAddHotel);
router.get('/edit-hotel/:id', planner.getEditHotel);
router.post('/edit-hotel/:id', planner.postEditHotel);
router.post('/delete-hotel/:id', planner.deleteHotel);

router.get('/add-transport', planner.getAddTransport);
router.post('/add-transport', planner.postAddTransport);
router.get('/edit-transport/:id', planner.getEditTransport);
router.post('/edit-transport/:id', planner.postEditTransport);
router.post('/delete-transport/:id', planner.deleteTransport);

module.exports = router;
