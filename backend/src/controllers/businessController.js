const asyncHandler = require("express-async-handler");
const Business = require("../models/Business");

// @desc    Create a new business
// @route   POST /business
// @access  Tenant admin
const createBusiness = asyncHandler(async (req, res) => {
  const { name, email, phoneNo, addressLine1, addressLine2, city, state, zipCode } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Name and email are required");
  }

  // Assign tenant from logged in user
  const tenantId = req.tenantId;

  const existing = await Business.findOne({ email, tenantId });
  if (existing) {
    res.status(400);
    throw new Error("Business with this email already exists in your tenant");
  }

  const business = await Business.create({
    name,
    email,
    phoneNo,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    tenantId,
    services: [],
    clients: [],
  });

  res.status(201).json(business);
});

// @desc    Get all businesses (with optional search/filter)
// @route   GET /business
// @access  Tenant admin
const getBusinesses = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const { search } = req.query;

  let filter = { tenantId };

  if (search) {
    // search by name or email
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const businesses = await Business.find(filter)
    .populate("services")
    .populate("clients", "name email");

  res.json(businesses);
});

// @desc    Get business by ID
// @route   GET /business/:id
// @access  Tenant admin
const getBusinessById = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const business = await Business.findOne({ _id: req.params.id, tenantId })
    .populate("services")
    .populate("clients", "name email");

  if (!business) {
    res.status(404);
    throw new Error("Business not found in your tenant");
  }

  res.json(business);
});

// @desc    Update business
// @route   PUT /business/:id
// @access  Tenant admin
const updateBusiness = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const business = await Business.findOne({ _id: req.params.id, tenantId });

  if (!business) {
    res.status(404);
    throw new Error("Business not found in your tenant");
  }

  // Update allowed fields
  const fields = [
    "name",
    "email",
    "phoneNo",
    "addressLine1",
    "addressLine2",
    "city",
    "state",
    "zipCode",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) business[field] = req.body[field];
  });

  const updatedBusiness = await business.save();
  res.json(updatedBusiness);
});

// @desc    Delete business
// @route   DELETE /business/:id
// @access  Tenant admin
const deleteBusiness = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const business = await Business.findOne({ _id: req.params.id, tenantId });

  if (!business) {
    res.status(404);
    throw new Error("Business not found in your tenant");
  }

  await business.remove();
  res.json({ message: "Business deleted" });
});

// @desc    Bulk delete businesses
// @route   DELETE /business
// @access  Tenant admin
const bulkDeleteBusinesses = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const { ids } = req.body; // array of business IDs

  if (!ids || !Array.isArray(ids)) {
    res.status(400);
    throw new Error("Provide an array of business IDs to delete");
  }

  const result = await Business.deleteMany({ _id: { $in: ids }, tenantId });
  res.json({ message: `${result.deletedCount} businesses deleted` });
});

module.exports = {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  bulkDeleteBusinesses,
};
