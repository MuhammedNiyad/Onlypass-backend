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
      default: "https://www.beelights.gr/assets/images/empty-image.png",
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
      default: "https://www.beelights.gr/assets/images/empty-image.png",
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
        },
        iconUrl:{
          type:String,
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
    facilityTiming: [
   {
    day:{
      type:String,
      // required:true,
    },
    morning:{
      start:{
        type:String,
        // required:true,
      },
      end:{
        type:String,
        // required:true,
      },
      holiday:{
        type:Boolean,
        // required:true,
      },
    },
    evening:{
      start:{
        type:String,
        // required:true,
      },
      end:{
        type:String,
        // required:true,
      },
      holiday:{
        type:Boolean,
        // required:true,
      }
    },
   }
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
