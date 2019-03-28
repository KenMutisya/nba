const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Player = new Schema({
    id: {
        type: String,
        required: true
    }
},
    {
        strict: false
    })

module.exports = mongoose.model('Player', Player);