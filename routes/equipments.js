const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Equipment = require("../model/equipments.model");

//setting multer for equipments image........!
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/equipmentsImg");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImg = multer({ storage: storage });

//CREATE EQUIPMENTS ........!

router.post(
  "/create-equipments",
  uploadImg.single("image"),
  async (req, res) => {
    console.log(">>>>>>>", req);
    try {
      let imgUrl;
      if (req.file && req.file.filename) {
        imgUrl =
          `${req.protocol}://${req.get('host')}/api/equipments/images/` + req.file.filename;
      } else {
        imgUrl = "https://www.beelights.gr/assets/images/empty-image.png";
      }
      // console.log("reqbody:", req.body);
      const newEquipment = new Equipment({
        name: req.body.name,
        status: req.body.status,
        description: req.body.description,
        image: imgUrl,
      });

      await newEquipment.save();
      res.status(200).json(newEquipment);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log("equipment error: ", error);
    }
  }
);

// UPDATE EQUIPMENT........!

router.put(
  "/update-equipment/:id",
  uploadImg.single("image"),
  async (req, res) => {
    // console.log("equipment update :", req.body);
    // return;
    try {
        let imgUrl;
      if (req.file && req.file.filename) {
        imgUrl =
          `${req.protocol}://${req.get('host')}/api/equipments/images/` + req.file.filename;
      } else {
        imgUrl = "https://www.beelights.gr/assets/images/empty-image.png";
      }
    
      const update = await Equipment.findByIdAndUpdate(
        req.params.id,
        req.file
          ? {
              ...req.body,
              image: imgUrl? imgUrl: req.file.filename,
            }
          : {
              ...req.body,
            }
      );
      res.status(200).json(update);
      console.log("updated equipment: ", update);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//   DELETE EQUIPMENT......!

router.delete("/delete-equipment/:id", async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.status(200).json("Equipment has been deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET EQUIPMENT BY ID........!
router.get("/one/:id", async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET ALL EQUIPMENT.........!

router.get("/all-equipment", async (req, res) => {
  try {
    const equipments = await Equipment.find();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET IMAGES.....
router.get(`/images/:imageName`, (req, res) => {
  const imageName = req.params.imageName; // Retrieve the image name from the URL parameter
  const imagesFolder = path.join(__dirname, "../Upload", "equipmentsImg"); // Define the folder where images are stored
  const imagePath = path.join(imagesFolder, imageName); // Construct the full image path
  res.sendFile(imagePath); // Send the image file as a response
});

module.exports = router;
