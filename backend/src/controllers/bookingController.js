const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Service = require('../models/Service');

// create booking (user)
const createBooking = asyncHandler(async (req, res) => {
  // const tenantId = req.tenantId;
  const { serviceId, start } = req.body;
  if (!serviceId || !start) { res.status(400); throw new Error('Missing fields'); }
  const service = await Service.findOne({ _id: serviceId });
  if (!service) { res.status(404); throw new Error('Service not found'); }
  const startDate = new Date(start);
  const endDate = new Date(startDate.getTime() + (service.durationMinutes || 60) * 60000);
  const servicePrice = service.price || 0;
  const booking = await Booking.create({
    // tenantId,
    user: req.user._id,
    service: service._id,
    business: service.business,
    start: startDate,
    end: endDate,
    status: 'pending',
    price: servicePrice
  });
  res.status(201).json(booking);
});

// list bookings (different views)
// ✅ List all bookings for logged-in user
const listBookings = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role; // assuming role is included in JWT

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    let bookings;

    if (role === "business") {
      // 🏢 If logged in as business → show bookings for services that belong to this business
      bookings = await Booking.find({ business: userId })
        .populate("service", "name priceRange")
        .populate("user", "name email phoneNo addressLine1 addressLine2 city state zipCode") // 👈 show user details who made the booking
        .sort({ createdAt: -1 });
    } else {
      // 👤 If logged in as user → show only their own bookings
      bookings = await Booking.find({ user: userId })
        .populate("service", "name priceRange")
        .populate("business", "name email") // show business info
        .sort({ createdAt: -1 });
    }

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  console.log("this is ->",req.params.id);
  
  const booking = await Booking.findOne({ _id: req.params.id});
  console.log(booking);
  
  if (!booking) { res.status(404); throw new Error('Booking not found'); }

  // only business (owner) or superadmin can change status
  if (req.user.role !== 'superadmin' && String(booking.business) !== String(req.user._id)) {
    res.status(403); throw new Error('Not allowed');
  }

  booking.status = req.body.status || booking.status;
  await booking.save();
  res.json(booking);
});

module.exports = { createBooking, listBookings, updateBookingStatus };
