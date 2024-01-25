const express = require("express");
const Fecilities = require("../model/Facility.model");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// this for save gym logo.......!
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/fecility_logo");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFecilityLogo = multer({ storage: storage });

//  CREATE FECILITIES.....!
router.post("/create", uploadFecilityLogo.single("gym_logo"), async (req, res) => {
    try {
      const newFecilities = new Fecilities({
        user_role: req.body.user_role,
        tier_id: req.body.tier_id,
        gym_gender: req.body.gym_gender,
        gym_name: req.body.gym_name,
        owner_name: req.body.owner_name,
        facility_type: [
          {
            access: req.body.access,
            pass: req.body.pass,
          },
        ],
        email: req.body.email,
        owner_phone_number: req.body.owner_phone_number,
        gym_website: req.body.gym_website,
        gym_logo: req.file.filename,
        descreption: req.body.description,
        facility_imgs_id: req.body.facility_imgs_id,
        gym_address: req.body.gym_address,
        pin_code: req.body.pin_code,
        country: req.body.country,
        state: req.body.state,
        latitude_Lognitude: req.body.latitude_Lognitude,
        aminities_id: req.body.aminities_id,
        equipments_id: req.body.equipments_id,
        timing: [
          {
            morning: req.body.morning,
            evening: req.body.evening,
          },
        ],
        admission_fee: req.body.admission_fee,
        amount_per_day: req.body.amount_per_day,
        daily_pass: req.body.daily_pass,
        three_month_pass: req.body.three_month_pass,
        six_month_pass: req.body.six_month_pass,
        annual_pass: req.body.annual_pass,
        other: req.body.other,
        review: req.body.review,
      });
      await newFecilities.save(); //saving the newFecilities to the database...!
      console.log(newFecilities);
      res.status(200).json("fecilities created");
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
    const updatedFecilities = await Fecilities.findByIdAndUpdate(
      req.params.id,
      {
        $set: update,
      },
      { new: true }
    );
    res.status(200).json(updatedFecilities);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

// DELETE FECILITIES.......!
router.delete("/remove/:id", async (req, res) => {
  try {
    await Fecilities.findByIdAndDelete(req.params.id);
    res.status(200).json("Fecilities has been deleted...!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET FECILITIES.....!
router.get("/:id", async (req, res) => {
  try {
    const fecilities = await Fecilities.findById(req.params.id);
    res.status(200).json(fecilities);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET ALL FECILITIES......!
router.get("/", async (req, res) => {
  try {
    const fecilities = await Fecilities.find();
    res.status(200).json(fecilities);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
