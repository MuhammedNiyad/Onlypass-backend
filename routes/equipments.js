const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Equipment = require('../model/equipments');


//setting multer for equipments image........!
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Upload/equipmentsImg')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const uploadImg = multer({ storage:storage});

//CREATE EQUIPMENTS ........!

router.post('/create-equipments', uploadImg.single('image'), async (req, res)=>{
    try {
        console.log("reqbody:", req.body);
        const newEquipment = new Equipment({
            name: req.body.name,
            image:req.file.filename
        });

        await newEquipment.save();
        res.status(200).json(newEquipment);

    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("equipment error: ", error);
    }
});

// UPDATE EQUIPMENT........!

router.put('/update-equipment', async (req, res)=>{
    try {
        const update = req.file ? {
            ...req.body,
            image: req.file.filename
        } : {
            ...req.body,
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//   DELETE EQUIPMENT......!

router.delete('/delete-equipment/:id', async (req, res)=>{
    try {
        await Equipment.findByIdAndDelete(req.params.id);
        res.status(200).json("Equipment has been deleted");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


//GET ALL EQUIPMENT.........!

router.get('/all-equipment', async (req, res)=>{
    try {
        const equipments = await Equipment.find();
        res.status(200).json(equipments);
    } catch (error) {
        res.status(500).json({message:error.message});
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
