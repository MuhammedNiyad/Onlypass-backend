const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
    status:{
        type:Boolean,
    },
    logo:{
        type:String,
        default: 'https://www.beelights.gr/assets/images/empty-image.png'
    }
},{timestamps:true});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;