const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new Schema(
  {
    user_role: {
      type: String,
    },
    tier: {
      // type:Schema.Types.ObjectId,
      // ref:"Tier",
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    facilityName: {
      type: String,
      required: true,
    },
    contactPerson: {
      //contact_person_name
      type: String,
      required: true,
    },
    facility_type: {
      type: String,
      // facility_type_name: {
      //   type: String,
      // },
      // isPaid: {
      //   type: Boolean,
      //   default: true,
      // },
    },
    emailAddress: {
      type: String,
    },
    phoneNumber: {
      //contact person_phone_number...!
      type: String,
      required: true,
      unique: true,
    },
    websiteURL: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
    },
    address: {
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
    latitude_longitude: {
      type: String,
    },
    amenities: [
      {
        amenities_name:{
          type: String,
        },
        isPaid:{
          type:String,
          // default: false,
        }
      }
    ],
    equipments: [
      {
        equipments_id:{
          type:String,
        },
        equipment_name:{
          type:String,
        },
        equipment_img:{
          type:String,
        }
      }
    ],
    facility_timing: [
      {
        Monday: {
          type: Object,
        },
        Tuesday: {
          type: Object,
        },
        Wednesday: {
          type: Object,
        },
        Thursday: {
          type: Object,
        },
        Friday: {
          type: Object,
        },
        Saturday: {
          type: Object,
        },
        Sunday: {
          type: Object,
        },
      },
    ],
    admission_fee: {
      type: Number,
    },
    amount_per_day: {
      type: Number,
    },
    daily_pass: {
      type:Number,
    },
    monthly_pass: {
      type: Number,
    },
    threeMonth_pass: {
      type: Number,
    },
    sixMonth_pass: {
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

const Facilities = mongoose.model("Facilities", facilitySchema);

module.exports = Facilities;
