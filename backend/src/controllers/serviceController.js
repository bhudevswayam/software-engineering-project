const asyncHandler = require('express-async-handler');
const Service = require('../models/Service');
const Business = require('../models/Business');
// create a service (business role)
const createService = asyncHandler(async (req, res) => {

  const {
    name,
    category,
    description,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    phoneNumber,
    email,
    priceRange,
    businessHours
  } = req.body;

  if (!name || !priceRange) {
    res.status(400);
    throw new Error('Missing required fields: name or priceRange');
  }
  const businessId = req.user._id;
  // // find the business
  const business = await Business.findById(businessId);
  if (!business) {
    res.status(404);
    throw new Error("Business not found");
  }

  const service = await Service.create({
    business: req.user._id,       // business owner
    tenantId: req.user.tenantId,  // add tenantId from the logged-in business
    name,
    category,
    description,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    phoneNumber,
    email,
    priceRange,
    businessHours
  });

  business.services.push(service._id);
  await business.save();

  res.status(201).json(service);
});


const listServices = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  
  // Get pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  // Get filter parameters
  const { business, category } = req.query;
  
  // Build filter object
  const filter = { tenantId, active: true };
  if (business) filter.business = business;
  if (category) filter.category = category;
  
  // Calculate skip value for pagination
  const skip = (page - 1) * limit;
  
  // Get total count for pagination metadata
  const totalItems = await Service.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);
  
  // Fetch paginated services
  const services = await Service.find(filter)
    .populate('business', 'name email')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  
  // Send response with pagination metadata
  res.json({
    services,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
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
