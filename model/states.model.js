const mongoose = require('mongoose');

const statesSchema = new mongoose.Schema({

    // what will give here...........!Think...

},{timestamps: true})

const States = mongoose.model('States', statesSchema);

module.exports = States;