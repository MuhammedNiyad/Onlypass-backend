const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facilities",
  },
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  comment:{
    type:String,
    required: true,
  },
  star_value:{
    type:Number,
    required: true,
  }
},{timestamps:true});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
