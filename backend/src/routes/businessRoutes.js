const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");

// POST /api/business → Create new business
router.post("/", businessController.createBusiness);

// GET /api/business → Get all businesses
router.get("/", businessController.getBusinesses);

// GET /api/business/:id → Get business by ID
router.get("/:id", businessController.getBusinessById);

module.exports = router;
