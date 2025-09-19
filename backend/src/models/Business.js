const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "business", "user"], default: "business" },
  phoneNo: Number,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: Number,
  tenantId: { type: String, required: true },

  // References to services they create
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }]
}, { timestamps: true });

module.exports = mongoose.model("Business", BusinessSchema);
