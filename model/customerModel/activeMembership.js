const mongoose = require("mongoose");

const activeMembershipSchema = new mongoose.Schema(
  {
    customers_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Customer", 
      unique: true,
    },
    membership_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "MembershipPlans",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },    
  },
  { timestamps: true }
);

const ActiveMembership = mongoose.model(
  "ActiveMembership",
  activeMembershipSchema
);
module.exports = ActiveMembership;