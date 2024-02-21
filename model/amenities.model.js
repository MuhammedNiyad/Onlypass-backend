const mongoose = require('mongoose');


const amenitiesSchame = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    available:{
        type:Boolean,
        default:true,
    },
    icon:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Amenities = mongoose.model("Amenities", amenitiesSchame);

module.exports = Amenities;