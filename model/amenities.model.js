const mongoose = require('mongoose');


const amenitiesSchame = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    isPaid:{
        type:Boolean,
        required: true,
    }
},{timestamps:true})

const Amenities = mongoose.model("Amenities", amenitiesSchame);

module.exports = Amenities;