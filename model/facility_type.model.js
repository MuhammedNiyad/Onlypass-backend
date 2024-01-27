const mongoose = require('mongoose');

const facility_typeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    }
},{timestamp:true})

const FecilityType = mongoose.model("FecilityType", facility_typeSchema);

module.exports = FecilityType;