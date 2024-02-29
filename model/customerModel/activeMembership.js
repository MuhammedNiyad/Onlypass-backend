const mongoose = require("mongoose");

const activeMembershipSchema = new mongoose.Schema(
  {
    customers_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    membership_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MemberShip",
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

const ActiveMembership = mongoose.model(
  "ActiveMembership",
  activeMembershipSchema
);
module.exports = ActiveMembership;