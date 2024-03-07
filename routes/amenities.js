const express = require('express');
const Amenities = require('../model/amenities.model');
const router = express.Router();
const path = require('path');
const multer = require('multer');

//setting multer for amenities image........!
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Upload/amenitiesIcon')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const uploadImg = multer({ storage:storage});

// CREATE AMENITIES.........!

router.post('/create', uploadImg.single('icon'), async(req, res)=>{
    console.log();
    try {
        const newAmenities = new Amenities({
            name: req.body.name,
            icon: req.file.filename,
            description: req.body.description,
            status: req.body.status,
        });
        await newAmenities.save();   
        console.log("new amenity added: ",newAmenities);    //save Amenities to database.......!
        res.status(200).json(newAmenities);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// UPDATE EQUIPMENT........!

router.put('/update-amenities/:id', uploadImg.single('icon'), async (req, res)=>{
    console.log("update data: ", req.body);
    try {
        const update = await Amenities.findByIdAndUpdate( req.params.id, req.file ? {
            ...req.body,
            icon: req.file.filename
        } : {
            ...req.body,
        },{new: true});
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});



// DELETE AMENITITES..........!

router.delete('/remove/:id', async (req, res)=>{
    // console.log("Ame id:", req.params.id);
    try {
        await Amenities.findByIdAndDelete(req.params.id)    //delete Amenities from database...!
        res.status(200).json({message:"Amenities deleted successfully"});
    } catch (error) {
        console.log('error',error)
        
        res.status(500),json({message: error.message});
    }
})

//


// GET ALL AMENITIES.......!

router.get('/', async (req, res)=>{
    try {
        const amenities = await Amenities.find();     // Finding Amenities from database...!
        res.status(200).json(amenities);  
        // console.log(amenities);        
    } catch (error) {
        res.status(500).json({message: error.message});
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