const express = require('express');
const router = express.Router();
const tenant = require('../middleware/tenant');
const { protect, authorize } = require('../middleware/auth');
const adminCtrl = require('../controllers/adminController');

// Only superadmin can create/list tenants
router.post('/tenants', tenant, protect, authorize('superadmin'), adminCtrl.createTenant);
router.get('/tenants', tenant, protect, authorize('superadmin'), adminCtrl.listTenants);

// list users by tenant (superadmin)
router.get('/tenants/:tenantId/users', protect, authorize('superadmin'), adminCtrl.listUsersByTenant);

module.exports = router;
