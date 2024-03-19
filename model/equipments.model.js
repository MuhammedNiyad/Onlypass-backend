const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: "https://www.beelights.gr/assets/images/empty-image.png",
    },
  },
  { timestamps: true }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;
