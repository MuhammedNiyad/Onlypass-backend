const express = require("express");
const MemberShip = require("../model/membership.model");
const MembershipDetails = require("../model/membershipDetails.model");
const router = express.Router();

// CREATE MEMBERSHIP........!

router.post("/create", async (req, res) => {
  console.log("memberShip:", req.body);
  try {
    const newMembership = new MemberShip({
      name: req.body.name,
      tier_id: req.body.tier_id,
      isListerForApp: req.body.isListerForApp,
      effectiveAmount: req.body.effectiveAmount,
      originalPrice: req.body.originalPrice,
    });
    await newMembership.save();
    console.log("new membership created: ", newMembership);
    res.status(200).json(newMembership);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log({ message: error.message });
  }
});

// UPDATA MEMBERSHIP.....!

router.put("/update-membership/:id", async (req, res) => {
  try {
    const updatedMembership = await MemberShip.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMembership);
    console.log("update", updatedMembership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE MEMBERSHIP...........!
router.delete("/remove/:id", async (req, res) => {
  try {
    await MemberShip.findByIdAndDelete(req.params.id);
    res.status(200).json("Membership deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL MEMBERSHIP........!

router.get("/all", async (req, res) => {
  try {
    const membership = await MemberShip.find();
    if (membership.length ===0 ) {
      res.status(404).json({ message: "There are no memberships" });
    }else{
        res.status(200).json(membership);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//FOR MEMBERSHIPDETAILS...........!

router.post('/membership-details/create', async (req, res)=>{
    console.log(req.body);
    // return;
    try {
        const newMembershipDetails = new MembershipDetails({
            membership_id: req.body.membership_id,
            no_of_days: req.body.no_of_days,
            no_of_access: req.body.no_of_access,
            per_day_access: req.body.per_day_access,
            per_day_amount: req.body.per_day_amount,
        });
        await newMembershipDetails.save();
        res.status(200).json(newMembershipDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE MEMBERSHIP DETAILS..........!
router.put('/membership-details/update/:id', async (req, res) => {
    try {
        const updatedDetails = await MemberShipDetails.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE MEMBERSHIP DETAILS...........!
router.delete("/membership-details/remove/:id", async (req, res) => {
    try {
      await MembershipDetails.findByIdAndDelete(req.params.id);
      res.status(200).json("Membership details deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// GET ALL MEMBERSHIP DETAILS.....!

router.get('/membership-detail/all', async (req, res) =>{
    try {
        const membershipDetails = await MembershipDetails.find().populate('membership_id');
        if (!membershipDetails || membershipDetails.length === 0) {
          return res.status(404).json({ message: "No membership details found" });
        }
        res.status(200).json(membershipDetails);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})


module.exports = router;
