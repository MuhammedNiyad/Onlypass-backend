const express = require("express");
const ActiveMembership = require("../../model/customerModel/activeMembership");
const MembershipPlans = require("../../model/membershipPlans.model");
const router = express.Router();


// This is for calculate end time
function calculateEndDate(startDate, validityDuration) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + validityDuration);
    return endDate.toISOString();
  }  

// Create ActiveMembership
router.post("/create", async (req, res) => {
  try {
    const membership = await MembershipPlans.findById(req.body.membership_id)
    const membershipValidity = membership.no_of_days;
    const startDate = new Date();
    const endDate = calculateEndDate(startDate, membershipValidity);
    // console.log("memberhsip plans: ", membershipValidity,startDate,endDate);
    
    // return 
    const activeMembership = await ActiveMembership.create({
        customers_id:req.body.customers_id,
        membership_id: req.body.membership_id,
        startDate:startDate,
        endDate:endDate,
    });
    res.status(201).json(activeMembership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update ActiveMembership by ID
router.put("/update/:id", async (req, res) => {
  try {
    const activeMembership = await ActiveMembership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(activeMembership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get ActiveMembership by ID
router.get("/customer/:id", async (req, res) => {
  try {
    const activeMembership = await ActiveMembership.find({customers_id: req.params.id})
      .populate("customers_id")
      .populate("membership_id");
    if (!activeMembership) {
      return res.status(404).json({ message: "ActiveMembership not found" });
    }
    res.json(activeMembership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all ActiveMemberships
router.get("/all", async (req, res) => {
  try {
    const activeMemberships = await ActiveMembership.find()
    .populate({
        path: 'customers_id',
      })
    .populate({
        path: 'membership_id',
      })
    res.json(activeMemberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
