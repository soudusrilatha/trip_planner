const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
  if (req.session.token) return res.redirect('/');
  res.render('auth/login', { title: 'Login - WanderPlan', messages: req.flash() });
};

exports.getRegister = (req, res) => {
  if (req.session.token) return res.redirect('/');
  res.render('auth/register', { title: 'Register - WanderPlan', messages: req.flash() });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user) {
      req.flash('error', 'Invalid credentials or wrong role selected');
      return res.redirect('/auth/login');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error', 'Invalid password');
      return res.redirect('/auth/login');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    req.session.token = token;
    req.flash('success', `Welcome back, ${user.name}!`);
    if (user.role === 'planner') return res.redirect('/planner/dashboard');
    return res.redirect('/traveler/home');
  } catch (err) {
    req.flash('error', 'Something went wrong. Try again.');
    return res.redirect('/auth/login');
  }
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      req.flash('error', 'Email already registered');
      return res.redirect('/auth/register');
    }
    const user = await User.create({ name, email, password, role, phone });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    req.session.token = token;
    req.flash('success', `Welcome to WanderPlan, ${user.name}!`);
    if (user.role === 'planner') return res.redirect('/planner/dashboard');
    return res.redirect('/traveler/home');
  } catch (err) {
    req.flash('error', 'Registration failed. Try again.');
    return res.redirect('/auth/register');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};
