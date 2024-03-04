const mongoose = require('mongoose');

const upcomingMembershipSchema = new mongoose.Schema(
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

const UpcomingMembership = mongoose.model("UpcomingMembership", upcomingMembershipSchema);
module.exports = UpcomingMembership;