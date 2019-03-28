const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Standings = new Schema({
    last_updated: {
        type: Number,
        default: Date.now(),
        required: true
    }
},
    { strict: false }

);

module.exports = mongoose.model('Standings', Standings);