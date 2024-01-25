const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const fecility_images = new mongoose.Schema({
  fecility_id: {
    type:Schema.Types.ObjectId,
    ref:"Fecilities",
  },
  fecility_images:{
    type:Array,
  }
},{timestamps:true});

const FecilityImgs = mongoose.model('FecilityImgs', fecility_images);

module.exports = FecilityImgs;