const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "business", "user"], default: "user" },
  phoneNo: { type: Number },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  tenantId: { type: String, required: true },

  // Optional: quick access to bookings (can also just query Booking collection)
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
