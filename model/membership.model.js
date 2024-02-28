const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tier_id: {
      type: String,
    },
    isListedForApp: {
      type: Boolean,
    },
    effectiveAmount: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const MemberShip = mongoose.model("MemberShip", membershipSchema);
module.exports = MemberShip;