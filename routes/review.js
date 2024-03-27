const express = require('express');
const Review = require('../model/review.model');
const Facilities = require('../model/Facility.model');
const router = express.Router();


// create review
router.post("/create", async (req, res)=>{
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        await Facilities.findByIdAndUpdate(
            req.body.facility,
            { $push: { review: newReview._id } },
            { new: true }
        );
        // console.log(facility);
        res.status(200).send(newReview);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// update review
router.put('/update/:id', async (req, res) =>{
    try {
        const update = await Review.findByIdAndUpdate(req.params.id,{...req.body},{new: true});
        res.status(200).send(update);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete review
router.delete('/delete/:id', async (req, res) =>{
    try {
        const deleted = await Review.findByIdAndDelete(req.params.id);

        if (deleted) {
            
             await Facilities.findByIdAndUpdate(
                deleted.facility,
                { $pull: { reviews: deleted._id } },
                { new: true } 
            );
        };
        res.status(200).json({message: "Review deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get all reviews
router.get("/all", async (req, res) =>{
    try {
        const reviews = await Review.find().populate('facility').populate('customer');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


module.exports = router;