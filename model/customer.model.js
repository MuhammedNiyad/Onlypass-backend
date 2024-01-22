const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_customer: {
      type: Boolean,
      default: false,
    },
    is_B2B: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
