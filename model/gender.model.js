const mongoose = require("mongoose");

const genderSchame = new mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamp: true }
);

const Gender = mongoose.model("Gender", genderSchame);

module.exports = Gender;
