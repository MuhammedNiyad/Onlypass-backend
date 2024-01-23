const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
  user_role: [
    {
      is_admin: {
        type: Boolean,
      },
      is_client: {
        type: Boolean,
      },
    },
  ],
  tier_id: {
    type: String,
    required: true, //tier_id want to specify......!
  },
  gym_gender: {
    type: String,
    required: true,
  },
  gym_name: {
    type: String,
    required: true,
  },
  owner_name: {   //contact_person_name
    type: String,
    required: true,
  },
  facility_type_id:{
    type: String,   //fecility want to specify......!
  },
  email:{
    type:String,
  },
  owner_phone_number:{ //contact person_phone_number...!
    type:Number,
    required:true,
    unique: true,
  },
  gym_website:{
    type:String,
  },
  gym_logo:{
    type:String,
  },
  Descreption:{
    type:String,
  },
  facility_images:[      //want to specify.............!
    {
        type:String,
    },
  ],
  gym_address:{
    type:String,
  },
  pin_code:{
    type:Number,
  },
  country:{
    type:String,
  },
  state:{
    type:String,
  },
  latitude_Lognitude:{
    type:Number,
  },
  aminities:[
    {
        aminities_id:{
            type:String,
        },
    },
  ],
  equipments:[
    {
        equipments_id:{
            type:String,
        },
    },
  ],
  time:[    //want to speciry.........!
    {
        timing_morning:{
            type:String,
        },
        timing_evening:{
            type:String,
        },
    },
  ],
  amount_per_day:{
    type:Number,
  },
  review:[     //want to specify......!
    {
      type:String,
    }
  ],
  admission_fee:{
    type:String,
  },
  daily_pass:{
    type:Boolean,
  },
  three_month_pass:{
    type:Number,
  },
  six_month_pass:{
    type:Number,
  },
  other:{
    type:String,
  },
  annual_pass:{
    type:Number,
  }
},{timestamps:true});


const Fecilities = mongoose.model("Fecilities", facilitySchema);

module.exports = Fecilities;