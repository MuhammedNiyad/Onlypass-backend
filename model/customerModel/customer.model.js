const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
  referrel: {
    type: String,
  },
  clubPoints: {
    type: Number,
  },
  clubLevel: {
    type: Number,
  },
  activeMembership: {
    // id reference.....
  },
  upcomingMembership: {
    // id reference.......
  },
  membershipHistory:{
    // id reference.......
  }
},{timestamps:true});


const Customer = mongoose.deleteModel('Customer',customerSchema);

module.exports = Customer;