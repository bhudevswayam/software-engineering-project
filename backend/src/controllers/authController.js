const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Business = require("../models/Business");
const Tenant = require("../models/Tenant");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const tenantId = `${name.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`;

  const tenant = await Tenant.create({
    name,
    tenantId,
  });

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

// @desc    Register new business & tenant
const registerBusiness = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNo, addressLine1, addressLine2, city, state, zipCode } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  // 1. Check if business already exists
  const exists = await Business.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("Business already exists with this email");
  }

  // 2. Generate tenantId (e.g., businessName_timestamp)
  const tenantId = `${name.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`;

  // 3. Create Tenant
  const tenant = await Tenant.create({
    name,
    tenantId,
  });

  // 4. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 5. Create Business linked to Tenant
  const business = await Business.create({
    name,
    email,
    password: hashedPassword,
    phoneNo,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    tenantId: tenant.tenantId,
    role: "business",
  });

  // 6. Send response
  res.status(201).json({
    id: business._id,
    name: business.name,
    email: business.email,
    tenantId: business.tenantId,
    role: business.role,
    token: generateToken(business),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Missing fields');
  }
  const user = await User.findOne({ email }) || await Business.findOne({ email });
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

module.exports = { register, login, registerBusiness };
