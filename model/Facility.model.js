const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new mongoose.Schema(
  {
    user_role: {
      type: String,
    },
    tier_id: {
      type:Schema.Types.ObjectId,
      ref:"Tier",
    },
    gym_gender: {
      type: String,
      required: true,
    },
    fecility_name: {
      type: String,
      required: true,
    },
    contact_person_name: {
      //contact_person_name
      type: String,
      required: true,
    },
    facility_type: {
      fecility_type_id:{
        type: String,
      },
      isPaid:{
        type: Boolean,
      }
    },
    email: {
      type: String,
    },
    phone_number: {
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
    fecility_timing: [
      {
      Monday: {
        type:Object,
      },
      Tuesday: {
        type:Object,
      },
      Wednesday: {
        type:Object,
      },
      Thursday: {
        type:Object,
      },
      Friday: {
        type:Object,
      },
      Saturday: {
        type:Object,
      },
      Sunday: {
        type:Object,
      }
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