const express = require("express");
const Customer = require("../../model/customerModel/customer.model");
const router = express.Router();

// Create a new customer
router.post("/create", async (req, res) => {
  try {
    let profile = null;
    if (req.file) {
      profile = req.file.filename;
    }

    const newCustomer = new Customer({
      phoneNumber: req.body.phoneNumber,
      countryId: req.body.countryId,
      gender: req.body.gender,
      name: req.body.name,
      email: req.body.email,
      profilePic: profile,
      height: req.body.height,
      weight: req.body.weight,
      address: req.body.address,
      referrel_code: req.body.referrel_code,
      clubPoints: req.body.clubPoints,
      clubLevel: req.body.clubLevel,
      is_offline: req.body.is_offline,
      activeMembership: req.body.activeMembership,
      upcomingMembership: req.body.upcomingMembership,
      membershipHistory: req.body.membershipHistory,
    });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a customer by ID
router.put("/update/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a customer by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all customers
router.get("/all", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
