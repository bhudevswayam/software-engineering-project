const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');

// create a service (business role)
const createService = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const { title, description, price, durationMinutes } = req.body;
  if (!title || !price) {
    res.status(400);
    throw new Error('Missing fields');
  }
  const service = await Service.create({
    tenantId,
    business: req.user._id,
    title, description, price, durationMinutes
  });
  res.status(201).json(service);
});

const listServices = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const { business } = req.query;
  const filter = { tenantId, active: true };
  if (business) filter.business = business;
  const services = await Service.find(filter).populate('business', 'name email');
  res.json(services);
});

const getService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json(service);
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!service) { res.status(404); throw new Error('Service not found'); }
  // only business owner or superadmin can update
  if (String(service.business) !== String(req.user._id) && req.user.role !== 'superadmin') {
    res.status(403); throw new Error('Not allowed');
  }
  Object.assign(service, req.body);
  await service.save();
  res.json(service);
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ _id: req.params.id, tenantId: req.tenantId });
  if (!service) { res.status(404); throw new Error('Service not found'); }
  if (String(service.business) !== String(req.user._id) && req.user.role !== 'superadmin') {
    res.status(403); throw new Error('Not allowed');
  }
  service.active = false;
  await service.save();
  res.json({ message: 'Service deactivated' });
});

module.exports = { createService, listServices, getService, updateService, deleteService };
