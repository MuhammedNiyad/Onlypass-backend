const express = require('express');
const Fecilities = require('../model/Facility.model');
const router = express.Router();


//  CREATE FECILITIES.....!
router.post('/create',async (req,res)=>{
    try {
        console.log("req.body: ",req.body);
        const newFecilities = new Fecilities(req.body);  
        await newFecilities.save();        //saving the newFecilities to the database...!
        res.status(200).json('fecilities created');
    } catch (error) {
        console.log("error: " , error.message);
    }
});

// UPDATE FECILITIES.......!
router.put('/update/:id', async (req, res) => {
    try {
        const updatedFecilities = await Fecilities.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true},
        );
        res.status(200).json(updatedFecilities);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
});

// DELETE FECILITIES.......!
router.delete('/remove/:id', async (req, res) => {
    try {
        await Fecilities.findByIdAndDelete(req.params.id);
        res.status(200).json("Fecilities has been deleted...!")
    } catch (error) {
        res.status(500).json(error)
    }
});

// GET FECILITIES.....!
router.get('/:id',async (req,res)=>{
    try {
        const fecilities = await Fecilities.findById(req.params.id);
        res.status(200).json(fecilities);
    } catch (error) {
        res.status(500).json(error.message);
    }
});


// GET ALL FECILITIES......!
router.get('/',async (req,res)=>{
    try {
        const fecilities = await Fecilities.find();
        res.status(200).json(fecilities);
    } catch (error) {
        res.status(500).json(error.message);
    }
});


module.exports = router;