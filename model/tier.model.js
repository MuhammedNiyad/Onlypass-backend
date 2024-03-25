const mongoose = require('mongoose');


const tierSchema = new mongoose.Schema({
    tier_name: {
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
    status:{
        type:Boolean,
    }
},{timestamps:true});

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;