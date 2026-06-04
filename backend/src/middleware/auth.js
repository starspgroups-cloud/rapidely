const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Login required' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = await User.findById(decoded.id).select('-otpCode');
    if (!req.user) return res.status(401).json({ message: 'Invalid user' });
    next();
  } catch (error) { return res.status(401).json({ message: 'Invalid token' }); }
}
function allowRoles(...roles) { return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'Not allowed' }); }
module.exports = { protect, allowRoles };
