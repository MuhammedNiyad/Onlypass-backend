const mongoose = require('mongoose');


const tierSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    }
},{timestamps:true});

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;