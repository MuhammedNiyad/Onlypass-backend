const express = require('express');
const Amenities = require('../model/amenities.model');
const router = express.Router();


// CREATE AMENITIES.........!

router.post('/create', async(req, res)=>{
    try {
        const newAmenities = new Amenities(req.body);
        await newAmenities.save();   
        console.log("new amenity added: ",newAmenities);                    //save Amenities to database.......!
        res.status(200).json(newAmenities);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE AMENITITES..........!

router.delete('remove/:id', async (req, res)=>{
    try {
        await Amenities.findByIdAndDelete(req.params.id)    //delete Amenities from database...!
    } catch (error) {
        res.status(500),json({message: error.message});
    }
})


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


module.exports = router;