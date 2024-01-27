const express = require('express');
const FecilityType = require('../model/facility_type.model');
const router = express.Router();

//CREATE FECILITY TYPE.....!
router.post('/create-fecility-type', async (req, res) => {
    try {
        const fecilityType = new FecilityType(req.body);
        await fecilityType.save();
        res.status(200).json(fecilityType);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE FECILITY TYPE.....!
router.delete('/delete-fecility-type/:id', async (req,res)=>{
    try {
        await FecilityType.findByIdAndDelete(req.params.id);
        res.status(200).json('Fecility Type deleted...!');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//GET ALL FEVILITY TYPES...........!
router.get('/all-fecility-type', async (req, res)=>{
    try {
        const fecilityType = await FecilityType.find();
        res.status(200).json(fecilityType);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;