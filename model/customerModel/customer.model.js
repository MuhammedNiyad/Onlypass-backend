const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    gender: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    date_of_birth:{
      type: String,
    },
    address: {
      type: String,
    },
    referral_code: {
      type: String,
    },
    referred_by: {
      type: String,
    },
    clubPoints: {
      type: Number,
    },
    clubLevel: {
      type: Number,
    },
    customer_type: {
      type: String,
      required: "OnlyPass",
    },
    activeMembership: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActiveMembership",
      },
    ],
    upcomingMemberships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UpcomingMembership",
      },
    ],
    membershipHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MembershipHistory",
      },
    ],
    emergencyContactName: {
      type: String,
    },
    emergencyContactNumber: {
      type: String,
    },
    deviceName: {
      type: String,
    },
    // permissions: [
    //   {type:mongoose.Schema.Types.ObjectId,
    //   ref:""}
    // ],
    accountUsing:{
      type:Array,
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
