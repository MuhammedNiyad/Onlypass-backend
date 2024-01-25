const mongoose = require('mongoose');

const statesSchema = new mongoose.Schema({

    // what give here...........!Think...

},{timestamps: true})

const States = mongoose.model('States', statesSchema);

module.exports = States;