const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    admin_name:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
},{timestamps: true});


const Admin = mongoose.model("Admin", adminSchema );

module.exports = Admin;