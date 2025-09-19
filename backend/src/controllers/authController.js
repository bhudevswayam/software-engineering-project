const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const tenantId = req.tenantId;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Missing fields');
  }
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('User already exists for this email');
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await User.create({
    name, email, password: hashed, role: role || 'user', tenantId
  });
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user)
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const tenantId = req.tenantId;
  if (!email || !password) {
    res.status(400);
    throw new Error('Missing fields');
  }
  const user = await User.findOne({ email, tenantId });
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user)
  });
});

module.exports = { register, login };
