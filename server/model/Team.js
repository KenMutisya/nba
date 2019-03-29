const mongoose = require('mongoose');

const { Schema } = mongoose;

const Team = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    market: {
        type: String,
        lowercase: true,
        trim: true
    },
    alias: {
        type: String,
        lowercase: true,
        trim: true
    },
    id: {
        type: String,
        lowercase: true,
        trim: true
    }
}, {
        stict: false
    });

module.exports = mongoose.model('Team', Team);