const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true }, // owner
  tenantId: { type: String, required: true }, // multi-tenant support

  // Existing fields
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  phoneNumber: { type: Number },
  email: { type: String },
  priceRange: { type: Number },
  businessHours: { type: String },

  // Booking reference (optional, can be queried from Booking collection too)
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],

  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Service", ServiceSchema);
