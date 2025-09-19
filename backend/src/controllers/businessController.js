const Business = require("../models/Business");

// Create new business
exports.createBusiness = async (req, res) => {
  try {
    const { name, owner, tenantId } = req.body;

    if (!name || !owner || !tenantId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const business = new Business({
      name,
      owner,
      tenantId,
      services: [],
      clients: []
    });

    await business.save();
    res.status(201).json(business);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all businesses
exports.getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find()
      .populate("owner", "name email")
      .populate("services")
      .populate("clients", "name email");
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get business by ID
exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate("owner", "name email")
      .populate("services")
      .populate("clients", "name email");

    if (!business) return res.status(404).json({ message: "Business not found" });

    res.json(business);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
