const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const FecilityImgs = require('../model/fecilityImages.model');

//setting multer for fecility images........!
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/facility_images");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const uploadImg = multer({ storage:storage});

router.post("/upload", uploadImg.single("fecility_images"), async (req, res) => {
    try {
        console.log(req.body);
        const newItem = new FecilityImgs({
            fecility_id: req.body.fecility_id,
            fecility_images: req.file.filename,
        })
        await newItem.save();
        console.log('image upload:', newItem);
        res.status(200).json('image uploaded');
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})


module.exports = router;