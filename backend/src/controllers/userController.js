const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Get all users (superadmin/admin)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ tenantId: req.tenantId }).select("-password");
  res.json(users);
});

// @desc    Get logged in user's profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").populate("bookings");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

// @desc    Update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.phoneNo = req.body.phoneNo || user.phoneNo;

  // Update new address fields
  user.addressLine1 = req.body.addressLine1 || user.addressLine1;
  user.addressLine2 = req.body.addressLine2 || user.addressLine2;
  user.city = req.body.city || user.city;
  user.state = req.body.state || user.state;
  user.zipCode = req.body.zipCode || user.zipCode;

  // Update password if provided
  if (req.body.password) {
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await user.save();
  res.json({
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phoneNo: updatedUser.phoneNo,
    addressLine1: updatedUser.addressLine1,
    addressLine2: updatedUser.addressLine2,
    city: updatedUser.city,
    state: updatedUser.state,
    zipCode: updatedUser.zipCode,
    role: updatedUser.role,
    bookings: updatedUser.bookings,
  });
});


// @desc    Delete user (superadmin only)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.json({ message: "User removed" });
});

module.exports = { getUsers, getProfile, updateProfile, deleteUser };
