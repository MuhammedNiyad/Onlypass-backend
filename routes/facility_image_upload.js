const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const FacilityImgs = require("../model/fecilityImages.model");

//setting multer for facility images........!
const storageImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/facility_images");
  },

  filename: (req, file, cb) => {
    console.log({ file });
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImg = multer({ storage: storageImg });

router.post(
  "/upload-img",
  uploadImg.array("facility_images"),
  async (req, res) => {
    try {
      console.log(req.files);

      const newItems = [];

      // Iterate over each uploaded file
      req.files.forEach((file) => {
        const newItem = new FacilityImgs({
          facility_images: file.filename,
        });

        newItems.push(newItem);
      });

      // Save all items to the database
      await FacilityImgs.insertMany(newItems);

      console.log("Images upload:", newItems);
      res.status(200).json(newItems);
    } catch (error) {
      console.log({ error });
      res.status(404).json({ message: error.message });
    }
  }
);

// this for save gym logo.......!
const storageLogo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/facility_logo");
  },

  filename: (req, file, cb) => {
    console.log({ file });
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFacilityLogo = multer({ storage: storageLogo });

router.post(
  "/upload-logo",
  uploadFacilityLogo.single("logo"),
  async (req, res) => {
    try {
      console.log("upload: ", req.body);
      const newItem = new FacilityImgs({
        // facility_id: req.body.facility_id,
        facility_images: req.file.filename,
      });
      await newItem.save();
      //   console.log("image upload:", newItem);
      res.status(200).json(newItem);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// GET FACILITY IMAGES.....
router.get(`/facility-images/:imageName`, (req, res) => {
  const imageName = req.params.imageName; // Retrieve the image name from the URL parameter
  const imagesFolder = path.join(__dirname, "../Upload", "facility_images"); // Define the folder where images are stored
  const imagePath = path.join(imagesFolder, imageName); // Construct the full image path
  res.sendFile(imagePath); // Send the image file as a response
});

// GET FACILITY LOGOS.....
router.get(`/facility-logo/:imageName`, (req, res) => {
  const imageName = req.params.imageName; // Retrieve the image name from the URL parameter
  const imagesFolder = path.join(__dirname, "../Upload", "facility_logo"); // Define the folder where images are stored
  const imagePath = path.join(imagesFolder, imageName); // Construct the full image path
  res.sendFile(imagePath); // Send the image file as a response
});

module.exports = router;
