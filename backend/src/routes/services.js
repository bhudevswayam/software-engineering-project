const express = require('express');
const router = express.Router();
const tenant = require('../middleware/tenant');
const { protect, authorize } = require('../middleware/auth');
const serviceCtrl = require('../controllers/serviceController');

router.get('/all', serviceCtrl.listAllServices); // new route for all services
router.get("/related/:id", serviceCtrl.getServicesByBusinessFromServiceId);
router.get('/:id', serviceCtrl.getService);
// protected routes for business users (and superadmin)
router.get('/', tenant, protect, authorize('business','admin','superadmin'), serviceCtrl.listServices);
router.post('/', tenant, protect, authorize('business','admin','superadmin'), serviceCtrl.createService);
router.put('/:id', tenant, protect, authorize('business','admin','superadmin'), serviceCtrl.updateService);
router.delete('/:id', tenant, protect, authorize('business','admin','superadmin'), serviceCtrl.deleteService);

module.exports = router;
