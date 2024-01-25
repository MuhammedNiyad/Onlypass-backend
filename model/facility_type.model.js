const mongoose = require('mongoose');

const facility_typeSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    }
},{timestamp:true})

const Facility_type = mongoose.model('Facility_type', facility_typeSchema);

module.exports = Facility_type;