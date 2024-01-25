const express = require('express');
const Gender = require('../model/gender.model');
const router = express.Router();


// CREATE GENDER......!
router.post('/gender-create', async (req, res) => {
    try {
        const newGender = new Gender(req.body);
        await newGender.save();
        res.status(200).json(newGender);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});



//UPDATE GENDER.......!
router.put('/gender-update/:id', async (req, res)=>{
    try {
        const update = await Gender.findByIdAndUpdate(
            req.params.id,
            {gender: req.body.gender},
            {new: true}
            
        );
        res.status(200).json(update);

        if (!updatedGender) {
          return res.status(404).json({ message: "Gender not found" });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//DELETE GENDER...........!
router.delete('/gender-delete/:id', async (req, res)=>{
    try {
        await Gender.findByIdAndDelete(req.params.id);
        res.status(200).json('Gender deleted successfully');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//GET ALL GENDER.......!
router.get('/gender-all', async (req, res) => {
    try {
        const gender = await Gender.findOne();
        res.status(200).json(gender);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


module.exports = router;