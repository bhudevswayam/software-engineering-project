const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const tenantMiddleware = require('../middleware/tenant');

router.post('/register', tenantMiddleware, register);
router.post('/login', tenantMiddleware, login);

module.exports = router;
