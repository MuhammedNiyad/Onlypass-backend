const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slogan_txt:{
      type: String,
    },
    tier_id: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    link_txt:{
      type: String,
    },
    link_url:{
      type: String,
    },
    status:{
      type:Boolean,
      default: true,
    },
    PriceTag_txt:{
      type: String,
    },
    effectiveAmount: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
    bg_image:{
      type: String,
    },
  },
  { timestamps: true }
);

const MemberShip = mongoose.model("MemberShip", membershipSchema);
module.exports = MemberShip;