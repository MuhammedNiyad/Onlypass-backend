const express = require('express');
const Tier = require('../model/tier.model');
const router = express.Router();

//CREATE TIER...........!
router.post('/create-tier', async (req, res) => {
    try {
        console.log("tier ====", req.body);
        const newTier = new Tier(req.body);
        await newTier.save();
        res.status(200).json(newTier);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
});

// Update Tier.....!
router.put('/update-tier/:id', async (req, res)=>{
    try {
        const update = await Tier.findByIdAndUpdate(
            req.params.id,
            {...req.body},
            {new: true}
        );
        res.status(200).json(update);
        // console.log(update);
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})

//DELETE TIER .......!
router.delete('/delete-tier/:id', async (req, res)=>{
    try {
        await Tier.findByIdAndDelete(req.params.id);
        res.status(200).json('Tier deleted...!')
    } catch (error) {
        res.status(500).json({menubar: 'error.message'});
    }
});


//GET ALL......!
router.get('/all-tier', async (req, res)=>{
    try {
        const tiers = await Tier.find();
        res.status(200).json(tiers)
    } catch (error) {
        res.status(500).json({message: 'error.message'});
    }
});


module.exports = router;