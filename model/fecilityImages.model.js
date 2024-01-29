const mongoose = require('mongoose');
// const Schema = mongoose.Schema;



const facility_images = new mongoose.Schema({
  // facility_id: {
  //   type:Schema.Types.ObjectId,
  //   ref:"Facilities",
  // },
  facility_images:{
    type:String,
  }
},{timestamps:true});

const FacilityImgs = mongoose.model('FacilityImgs', facility_images);

module.exports = FacilityImgs;