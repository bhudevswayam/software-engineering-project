require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Tenant = require('../models/Tenant');

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const tenantId = process.env.SUPER_TENANT_ID || 'global';
    await Tenant.findOneAndUpdate({ tenantId }, { name: 'Global Tenant', tenantId }, { upsert: true });
    const exists = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL, tenantId });
    if (exists) {
      console.log('Superadmin already exists');
      process.exit(0);
    }
    const password = process.env.SUPER_ADMIN_PWD || 'password123';
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      tenantId,
      name: 'Super Admin',
      email: process.env.SUPER_ADMIN_EMAIL || 'super@admin.com',
      password: hashed,
      role: 'superadmin'
    });
    console.log('Superadmin created:', user.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
