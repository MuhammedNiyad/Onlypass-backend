const express = require('express');
const router = express.Router();


// CREATE AMENITIES.........!

router.post('/create', async(req, res)=>{
    try {
        console.log('amenities: ', req.body);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



module.exports = router;