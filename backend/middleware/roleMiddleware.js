const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      req.flash('error', 'Please login to continue');
      return res.redirect('/auth/login');
    }
    if (req.user.role !== role) {
      req.flash('error', 'Access denied. You do not have permission.');
      return res.redirect('/');
    }
    next();
  };
};

module.exports = roleMiddleware;
