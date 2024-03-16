const express = require("express");
const Amenities = require("../model/amenities.model");
const router = express.Router();
const path = require("path");
const multer = require("multer");

//setting multer for amenities image........!
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/amenitiesIcon");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImg = multer({ storage: storage });

// CREATE AMENITIES.........!

router.post("/create", uploadImg.single("icon"), async (req, res) => {
  console.log(">>>>>>>>>>>", req.body);
  try {
    let iconUrl;
    if (req.file && req.file.filename) {
      iconUrl =
        "http://192.168.1.16:5000/api/amenities/icon/" + req.file.filename;
    } else {
      iconUrl = "https://www.beelights.gr/assets/images/empty-image.png";
    }

    const newAmenities = new Amenities({
      status: req.body.status,
      name: req.body.name,
      description: req.body.description,
      icon: iconUrl,
    });
    await newAmenities.save();
    console.log("new amenity added: ", newAmenities); //save Amenities to database.......!
    res.status(200).json(newAmenities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE EQUIPMENT........!

router.put(
    "/update-amenities/:id",
    uploadImg.single("icon"),
    async (req, res) => {
      console.log("update data: ", req.body);
      const logoGetUrl = "http://192.168.1.16:5000/api/amenities/icon/";
      try {
        let iconUrl = req.file && req.file.icon === '[object Object]' 
            ? 'https://www.beelights.gr/assets/images/empty-image.png' 
            : req.file
                ? logoGetUrl + req.file.filename
                : null;
        const update = await Amenities.findByIdAndUpdate(
          req.params.id,
          iconUrl
            ? {
                ...req.body,
                icon: iconUrl,
              }
            : {
                ...req.body,
              },
          { new: true }
        );
        res.status(200).json(update);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );  

// DELETE AMENITITES..........!

router.delete("/remove/:id", async (req, res) => {
  // console.log("Ame id:", req.params.id);
  try {
    await Amenities.findByIdAndDelete(req.params.id); //delete Amenities from database...!
    res.status(200).json({ message: "Amenities deleted successfully" });
  } catch (error) {
    console.log("error", error);

    res.status(500), json({ message: error.message });
  }
});

//

// GET ALL AMENITIES.......!

router.get("/", async (req, res) => {
  try {
    const amenities = await Amenities.find(); // Finding Amenities from database...!
    res.status(200).json(amenities);
    // console.log(amenities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET IMAGES.....
router.get(`/icon/:iconName`, (req, res) => {
  const imageName = req.params.iconName; // Retrieve the image name from the URL parameter
  const imagesFolder = path.join(__dirname, "../Upload", "amenitiesIcon"); // Define the folder where images are stored
  const imagePath = path.join(imagesFolder, imageName); // Construct the full image path
  res.sendFile(imagePath); // Send the image file as a response
});

module.exports = router;
