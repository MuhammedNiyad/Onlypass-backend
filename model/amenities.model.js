const mongoose = require('mongoose');


const amenitiesSchame = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    icon:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    }
},{timestamps:true})

const Amenities = mongoose.model("Amenities", amenitiesSchame);

module.exports = Amenities;