require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const connectDB = require('./backend/config/db');
const { optionalAuth } = require('./backend/middleware/authMiddleware');

const app = express();

// View Engine — points to frontend/views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));

// Static Assets — points to frontend/public
app.use(express.static(path.join(__dirname, 'frontend/public')));

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

// Flash
app.use(flash());

// Global auth
app.use(optionalAuth);

// Global flash messages
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Auto Seed Logic
const autoSeed = async () => {
  const User = require('./backend/models/User');
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log('🌱 Database is empty! Auto-seeding initial data...');
    try {
      // Require the seed file to run its logic
      const seedFunc = require('./backend/seedFunc');
      if (seedFunc) await seedFunc();
    } catch (e) {
      console.log('⚠️ Could not run auto-seed directly. Try running npm run seed manually.');
    }
  }
};
// connectDB and then autoseed
connectDB().then(() => {
  autoSeed();
});

// Routes
app.use('/auth', require('./backend/routes/auth'));
app.use('/planner', require('./backend/routes/planner'));
app.use('/traveler', require('./backend/routes/traveler'));

// Home redirect
app.get('/', (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.role === 'planner') return res.redirect('/planner/dashboard');
    return res.redirect('/traveler/home');
  }
  res.redirect('/traveler/home');
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - WanderPlan' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 WanderPlan server running at http://localhost:${PORT}`);
});
