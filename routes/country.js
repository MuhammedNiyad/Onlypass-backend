const express = require('express');
const Country = require('../model/country.model');
const router = express.Router();


//CREATE COUNTRY......!
router.post('/country-create', async (req, res)=>{
    try {
        const newCountry = new Country(req.body);
        await newCountry.save();
        console.log("new Country: ", newCountry);
        res.status(200).json(newCountry);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


//UPDATE COUNTRY...........!
router.put('/country-update/:id', async(req, res)=>{
    try {
        const update = await Country.findByIdAndUpdate(req.params.id);
        res.status(200).json(update);
        console.log("updated country: ",update);
        } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//DELETE COUNTRY............!
router.delete('/country-delete/:id', async (req, res) => {
    try {
        await Country.findByIdAndDelete(req.params.id);
        res.status(200).json('Country deleted successfully........!')
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//GET ALL COUNTRY............!
router.get('/all-country', async (req, res) => {
    try {
        const country = await Country.find();
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


module.exports = router;