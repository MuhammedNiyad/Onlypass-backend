const mongoose = require("mongoose");

const membershipDetailsSchema = new mongoose.Schema(
  {
    membership_id: { type: mongoose.Schema.Types.ObjectId, ref: "MemberShip" },
    no_of_days: { type: Number },
    no_of_access: { type: Number },
    per_day_access: { type: Number },
    per_day_amount: { type: Number },
  },
  { timestamps: true }
);

const MembershipDetails = mongoose.model(
  "MembershipDetails",
  membershipDetailsSchema
);
module.exports = MembershipDetails;
