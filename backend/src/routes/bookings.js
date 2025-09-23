const express = require('express');
const router = express.Router();
const tenant = require('../middleware/tenant');
const { protect, authorize } = require('../middleware/auth');
const ctrl = require('../controllers/bookingController');

router.post('/', protect, authorize('user','superadmin'), ctrl.createBooking);
router.get('/', tenant, protect, ctrl.listBookings);
router.put('/:id/status', tenant, protect, authorize('business','admin','superadmin'), ctrl.updateBookingStatus);

module.exports = router;
