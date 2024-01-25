const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;