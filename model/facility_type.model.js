const mongoose = require('mongoose');

const facility_typeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    }
},{timestamp:true})

const FacilityType = mongoose.model("FacilityType", facility_typeSchema);

module.exports = FacilityType;