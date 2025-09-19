const express = require("express");
const router = express.Router();
const { getUsers, getProfile, updateProfile, deleteUser } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");
const setTenant = require('../middleware/tenant');// All routes are tenant-aware
router.use(setTenant);  // set tenant before protect
router.use(protect);

// Get logged in user profile
router.get("/profile", getProfile);

// Update profile
router.put("/profile", updateProfile);

// Admin/superadmin: get all users
router.get("/", authorize("superadmin", "admin"), getUsers);

// Superadmin: delete user
router.delete("/:id", authorize("superadmin"), deleteUser);

module.exports = router;
