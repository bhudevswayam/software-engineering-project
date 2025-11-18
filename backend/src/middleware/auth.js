const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Business = require('../models/Business');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(auth);
  
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    // Try finding in User
    let user = await User.findById(decoded.id);
    
    // If not found, try Business
    if (!user) {
      user = await Business.findById(decoded.id);
    }
    console.log(user);
    

    
    if (!user) {
      res.status(401);
      throw new Error('Not authorized, user is not found');
    }

    // Allow normal users if tenantId matches OR if superadmin
    if (req.tenantId && user.tenantId !== req.tenantId && user.role !== 'superadmin') {
      res.status(403);
      throw new Error('Tenant mismatch');
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.log(err);
    
    res.status(401);
    throw new Error('Not authorized, token is this the end invalid');
  }
});

// Role-based authorization middleware
const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden - insufficient role' });
  }

  next();
};

module.exports = { protect, authorize };
