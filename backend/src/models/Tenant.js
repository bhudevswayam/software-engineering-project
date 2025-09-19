const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tenantId: { type: String },
  meta: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', TenantSchema);
