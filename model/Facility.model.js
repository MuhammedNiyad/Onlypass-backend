const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    user_role: {
      type: String,
    },
    tier_id: {
      type: String,
      //tier_id want to specify......!
    },
    gym_gender: {
      type: String,
      required: true,
    },
    gym_name: {
      type: String,
      required: true,
    },
    owner_name: {
      //contact_person_name
      type: String,
      required: true,
    },
    facility_type: [
      {
        access: { type: Boolean },
        pass: { type: Boolean },
      },
    ],
    email: {
      type: String,
    },
    owner_phone_number: {
      //contact person_phone_number...!
      type: Number,
      required: true,
      unique: true,
    },
    gym_website: {
      type: String,
    },
    gym_logo: {
      type: String,
    },
    descreption: {
      type: String,
    },
    facility_imgs_id: {
      type: Array,
    },
    gym_address: {
      type: String,
    },
    pin_code: {
      type: Number,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    latitude_Lognitude: {
      type: String,
    },
    aminities_id: {
      type: Array,
    },
    equipments_id: {
      type: Array,
    },
    timing: [
      //want to speciry.........!
      {
        morning: {
          type: String,
        },
        evening: {
          type: String,
        },
      },
    ],
    admission_fee: {
      type: String,
    },
    amount_per_day: {
      type: Number,
    },
    daily_pass: {
      type: Boolean,
    },
    three_month_pass: {
      type: Number,
    },
    six_month_pass: {
      type: Number,
    },
    annual_pass: {
      type: Number,
    },
    other: {
      type: String,
    },
    review: {
      type: Array,
    },
  },
  { timestamps: true }
);


const Fecilities = mongoose.model("Fecilities", facilitySchema);

module.exports = Fecilities;