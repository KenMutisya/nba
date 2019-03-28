const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamID = new Schema({

},
    { strict: false });

module.exports = mongoose.model('TeamID', TeamID);