const express = require("express");
const Customer = require("../../model/customerModel/customer.model");
const router = express.Router();

// 
function generateReferralCode(length) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}

// Create a new customer
router.post("/create", async (req, res) => {
  
  try {
    let profile = null;
    if (req.file) {
      profile = req.file.filename;
    }

    const referralCode = generateReferralCode(6);

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
      referral_code: referralCode,
      referred_by:req.body.referred_by,
      clubPoints: req.body.clubPoints,
      clubLevel: req.body.clubLevel,
      is_offline: req.body.is_offline,
      emergencyContactName:req.body.emergencyContactName,
      emergencyContactNumber: req.body.emergencyContactNumber,
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
router.get("/one/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('activeMembership').populate('upcomingMemberships').populate('membershipHistory');
    if (customer) {
      res.status(200).json(customer);
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
