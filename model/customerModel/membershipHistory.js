const mongoose = require("mongoose");

const MembershipHistorySchema = new mongoose.Schema(
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

const MembershipHistory = mongoose.model(
  "MembershipHistory",
  MembershipHistorySchema
);
module.exports = MembershipHistory;