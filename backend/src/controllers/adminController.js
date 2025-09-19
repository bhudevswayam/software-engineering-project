const asyncHandler = require('express-async-handler');
const Tenant = require('../models/Tenant');
const User = require('../models/User');

// create tenant (superadmin)
const createTenant = asyncHandler(async (req, res) => {
  const { name, tenantId } = req.body;
  if (!name || !tenantId) { res.status(400); throw new Error('Missing fields'); }
  const exists = await Tenant.findOne({ tenantId });
  if (exists) { res.status(400); throw new Error('Tenant exists'); }
  const tenant = await Tenant.create({ name, tenantId });
  res.status(201).json(tenant);
});

// list tenants
const listTenants = asyncHandler(async (req, res) => {
  const tenants = await Tenant.find();
  res.json(tenants);
});

// list users in tenant
const listUsersByTenant = asyncHandler(async (req, res) => {
  const tenantId = req.params.tenantId;
  const users = await User.find({ tenantId }).select('-password');
  res.json(users);
});

module.exports = { createTenant, listTenants, listUsersByTenant };
