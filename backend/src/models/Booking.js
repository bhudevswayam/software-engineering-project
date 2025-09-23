const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed"], default: "pending" },
  price: { type: Number } // optional, snapshot of service price at time of booking
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);