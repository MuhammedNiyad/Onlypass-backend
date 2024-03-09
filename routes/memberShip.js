const express = require("express");
const MemberShipPackage = require("../model/membership.model");
const MembershipPlans = require("../model/membershipPlans.model");
const router = express.Router();
const path = require("path");
const multer = require("multer");


// FOR BG_IMAGES UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/membershipPlansImg");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImg = multer({ storage: storage });

// CREATE MEMBERSHIP Package........!

router.post("/package/create", uploadImg.single("bg_image"), async (req, res) => {
  console.log("memberShip:", req.body);
  try {

    let imageFileName = null; // Initialize imageFileName variable
      if (req.file) {
        // Check if file was uploaded
        imageFileName = req.file.filename; // If yes, assign the filename
      }

    const newMembershipPackage = new MemberShipPackage({
      name: req.body.name,
      slogan_txt: req.body.slogan_txt,
      tier_id: req.body.tier_id,
      category: req.body.category,
      description: req.body.description,
      link_txt: req.body.link_txt,
      link_url:req.body.link_url,
      status: req.body.status,
      priceTag_txt:req.body.priceTag_txt,
      effectiveAmount: req.body.effectiveAmount,
      originalPrice: req.body.originalPrice,
      bg_image:imageFileName,
    });
    await newMembershipPackage.save();
    console.log("new membership created: ", newMembershipPackage);
    res.status(200).json(newMembershipPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log({ message: error.message });
  }
});

// UPDATA MEMBERSHIP Package.....!

router.put("/package/update/:id", uploadImg.single("bg_image"), async (req, res) => {
  console.log(">>>>>>",req.body);
  try {
    const updatedMembershipPackage = await MemberShipPackage.findByIdAndUpdate(
      req.params.id, req.file ? {
        ...req.body,
        bg_image: req.file.filename
      } : {
        ...req.body,
      },{new: true}
    );
    res.status(200).json(updatedMembershipPackage);
    console.log("update", updatedMembershipPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE MEMBERSHIP...........!
router.delete("/remove/:id", async (req, res) => {
  try {
    await MemberShipPackage.findByIdAndDelete(req.params.id);
    res.status(200).json("Membership deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID...........!
router.get("/package/one/:id", async (req, res)=>{
  try {
    package = await Package.findById(req.params.id);
;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// GET ALL MEMBERSHIP........!

router.get("/package/all", async (req, res) => {
  try {
    const membership = await MemberShipPackage.find();
    const plans = await MembershipPlans.find();
    if (membership.length === 0) {
      res.status(404).json({ message: "There are no memberships" });
    } else {
      res.status(200).json({Membership:membership,Plans:plans});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//FOR MEMBERSHIP PLANS...........!

router.post(
  "/membership-plans/create",
  uploadImg.single("bg_image"),
  async (req, res) => {
    console.log(req.body);
    // return;
    try {
      let imageFileName = null; // Initialize imageFileName variable
      if (req.file) {
        // Check if file was uploaded
        imageFileName = req.file.filename; // If yes, assign the filename
      }

      const newMembershipPlans = new MembershipPlans({
        membership_id: req.body.membership_id,
        name: req.body.name,
        status: req.body.status,
        no_of_days: req.body.no_of_days,
        no_of_access: req.body.no_of_access,
        per_day_access: req.body.per_day_access,
        description: req.body.description,
        feature: req.body.feature,
        amount: req.body.amount,
        offer_amount: req.body.offer_amount,
        help_text: req.body.help_text,
        bg_image: imageFileName,
      });
      await newMembershipPlans.save();
      res.status(200).json(newMembershipPlans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// UPDATE MEMBERSHIP PLANS..........!
router.put("/membership-plans/update/:id", uploadImg.single("bg_image"), async (req, res) => {
  try {
    const updatedPlans = await MembershipPlans.findByIdAndUpdate(
      req.params.id, req.file ? {
        ...req.body,
        icon: req.file.filename
    } : {
        ...req.body,
    },{new: true}
    );
    res.status(200).json(updatedPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE MEMBERSHIP PLANS...........!
router.delete("/membership-plans/remove/:id", async (req, res) => {
  try {
    await MembershipPlans.findByIdAndDelete(req.params.id);
    res.status(200).json("Membership plans deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  GET BY PACKAGE ID..............!
router.get("/package/plans/:id", async (req, res) => {
  try {
     const plans = await MembershipPlans.find({ membership_id: req.params.id }).populate("membership_id");
     console.log(plans);
     res.status(200).json(plans);
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
 });

// GET ALL MEMBERSHIP PLANS.....!

router.get("/membership-plans/all", async (req, res) => {
  try {
    const membershipPlans = await MembershipPlans.find().populate(
      "membership_id"
    );
    if (!membershipPlans || membershipPlans.length === 0) {
      return res.status(404).json({ message: "No membership plans found" });
    }
    res.status(200).json(membershipPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PLANS IMAGES.....
router.get(`/plans/:imageUrl`, (req, res) => {
  const imageName = req.params.imageUrl; // Retrieve the image name from the URL parameter
  const imagesFolder = path.join(__dirname, "../Upload", "membershipPlansImg"); // Define the folder where images are stored
  const imagePath = path.join(imagesFolder, imageName); // Construct the full image path
  res.sendFile(imagePath); // Send the image file as a response
});

module.exports = router;
