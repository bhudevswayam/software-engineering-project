// middleware/tenant.js
const setTenant = (req, res, next) => {
  const tenantId = req.header('x-tenant-id');
  if (!tenantId) {
    return res.status(400).json({ message: 'Missing x-tenant-id header' });
  }
  req.tenantId = tenantId;
  next();
};

module.exports = setTenant; 
