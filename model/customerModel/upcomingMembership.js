const mongoose = require("mongoose");

const upcomingMembershipSchema = new mongoose.Schema(
  {
    customers_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    membership_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipPlans",
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  { timestamps: true }
);

const UpcomingMembership = mongoose.model(
  "UpcomingMembership",
  upcomingMembershipSchema
);
module.exports = UpcomingMembership;