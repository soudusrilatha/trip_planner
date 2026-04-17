const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.session.token;
    if (!token) {
      req.flash('error', 'Please login to continue');
      return res.redirect('/auth/login');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/auth/login');
    }
    req.user = user;
    res.locals.user = user;
    next();
  } catch (err) {
    req.flash('error', 'Session expired, please login again');
    return res.redirect('/auth/login');
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.session.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      req.user = user;
      res.locals.user = user;
    } else {
      res.locals.user = null;
    }
  } catch (err) {
    res.locals.user = null;
  }
  next();
};

module.exports = { authMiddleware, optionalAuth };
