const express = require("express");
const router = express.Router();
const {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  bulkDeleteBusinesses,
  getBusinessServices,
  getBusinessServiceById,
} = require("../controllers/businessController");

const { protect, authorize } = require("../middleware/auth");
const setTenant = require('../middleware/tenant');

router.use(setTenant);  // set tenant before protect
router.use(protect);
// Apply `protect` middleware to make sure user is logged in
// Apply `admin` or tenant-admin middleware as needed

// Create a new business
router.post("/", createBusiness);

// Get all businesses (with optional search/filter)
router.get("/", getBusinesses);

// Get a business by ID
router.get("/:id", authorize('business'), getBusinessById);

// Update a business
router.put("/:id", authorize('business'), updateBusiness);

// Delete a business
router.delete("/:id", authorize('business'), deleteBusiness);

// Bulk delete businesses
router.delete("/", authorize('business'), bulkDeleteBusinesses);

// services for a business
router.get("/:id/services", authorize("business"), getBusinessServices);
router.get("/:businessId/services/:serviceId", authorize("business"), getBusinessServiceById);

module.exports = router;
