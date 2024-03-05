const mongoose = require("mongoose");

const membershipPlansSchema = new mongoose.Schema(
  {
    membership_id: { type: mongoose.Schema.Types.ObjectId, ref: "MemberShip" },
    name: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    no_of_days: { type: Number },
    no_of_access: { type: Number },
    per_day_access: { type: Number },
    description: {
      type: String,
    },
    feature: {
      type: String,
    },
    amount: { type: Number },
    offer_amount: {
      type: Number,
    },
    help_text:{
      type: String,
    },
    bg_image:{
      type: String,
    },
  },
  { timestamps: true }
);

const MembershipPlans = mongoose.model(
  "MembershipPlans",
  membershipPlansSchema
);
module.exports = MembershipPlans;
