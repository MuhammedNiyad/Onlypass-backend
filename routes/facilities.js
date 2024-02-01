const express = require("express");
const Facilities = require("../model/Facility.model");
const router = express.Router();

//  CREATE FECILITIES.....!
router.post("/create", async (req, res) => {
  console.log('reqbody: ', req.body);
    try {
      const newFacilities = new Facilities({
        user_role: req.body.user_role,
        tier: req.body.tier,
        gender: req.body.gender,
        facilityName: req.body.facilityName,
        contactPerson: req.body.contactPerson,
        facility_type: req.body.facility_type,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        websiteURL: req.body.websiteURL,
        logoUrl: req.body.logoUrl,
        descreption: req.body.description,
        images: req.body.images,
        address: req.body.address,
        pin_code: req.body.pin_code,
        country: req.body.country,
        state: req.body.state,
        latitude_lognitude: req.body.latitude_lognitude,
        aminities_id: req.body.aminities_id,
        equipments_id: req.body.equipments_id,
        facility_timing: req.body.facility_timing,
        admission_fee: req.body.admission_fee,
        amountPer_day: req.body.amountPer_day,
        daily_pass: req.body.daily_pass,
        monthly_pass: req.body.monthly_pass,
        threeMonth_pass: req.body.threeMonth_pass,
        sixMonth_pass: req.body.sixMonth_pass,
        annual_pass: req.body.annual_pass,
        other: req.body.other,
        review: req.body.review,
      });
      await newFacilities.save(); //saving the newFecilities to the database...!
      console.log(newFacilities);
      res.status(200).json("facilities created");
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).json({message: error.message});
    }
  }
);

// UPDATE FECILITIES.......!
router.put("/update/:id", async (req, res) => {
  try {
    const update = req.file.gym_logo
      ? {
          ...req.body,
          gym_logo: req.file.filename,
        }
      : {
          ...req.body,
        };
    const updatedFacilities = await Facilities.findByIdAndUpdate(
      req.params.id,
      {
        $set: update,
      },
      { new: true }
    );
    res.status(200).json(updatedFacilities);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

// DELETE FECILITIES.......!
router.delete("/remove/:id", async (req, res) => {
  try {
    await Facilities.findByIdAndDelete(req.params.id);
    res.status(200).json("Facilities has been deleted...!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET FECILITIES.....!
router.get("/:id", async (req, res) => {
  try {
    const facilities = await Facilities.findById(req.params.id);
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET ALL FECILITIES......!
router.get("/", async (req, res) => {
  try {
    const facilities = await Facilities.find();
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
