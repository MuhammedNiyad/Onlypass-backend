const mongoose= require('mongoose');

const countrySchame = new mongoose.Schema({
    country_name: {
        type:String,
        required:true,
        unique:true
    }
},{timestamp:true});

const Country = mongoose.model('Country',countrySchame);

module.exports = Country;