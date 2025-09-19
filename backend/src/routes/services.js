const express = require('express');
const router = express.Router();
const tenant = require('../middleware/tenant');
const { protect, authorize } = require('../middleware/auth');
const serviceCtrl = require('../controllers/serviceController');

router.get('/', tenant, serviceCtrl.listServices);
router.get('/:id', tenant, serviceCtrl.getService);

// protected routes for business users (and superadmin)
router.post('/', tenant, protect, authorize('business','admin','superadmin'), serviceCtrl.createService);
router.put('/:id', tenant, protect, authorize('business','admin','superadmin'), serviceCtrl.updateService);
router.delete('/:id', tenant, protect, authorize('business','admin','superadmin'), serviceCtrl.deleteService);

module.exports = router;
