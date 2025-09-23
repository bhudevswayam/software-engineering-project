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
const listBookings = asyncHandler(async (req, res) => {
  const tenantId = req.tenantId;
  const filter = { tenantId };

  if (req.user.role === 'user') filter.user = req.user._id;
  else if (req.user.role === 'business' || req.user.role === 'admin') filter.business = req.user._id;
  // superadmin sees all

  const bookings = await Booking.find(filter)
    .populate('service')
    .populate('user', 'name email')
    .populate('business', 'name email');

  res.json(bookings);
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, tenantId: req.tenantId });
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
