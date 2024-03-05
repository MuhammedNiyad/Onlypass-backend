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
    address: {
      type: String,
    },
    referrel_code: {
      type: String,
    },
    clubPoints: {
      type: Number,
    },
    clubLevel: {
      type: Number,
    },
    is_offline:{
      type: Boolean,
      required: true,
    },
    activeMembership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActiveMembership",
    },
    upcomingMembership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UpcomingMembership",
    },
    membershipHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipHistory",
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
