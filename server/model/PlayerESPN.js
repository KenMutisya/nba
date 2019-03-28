const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerESPN = new Schema({
    firstName: String,
    lastName: String,
    playerId: Number,
    teamId: Number
});

module.exports = mongoose.model('PlayerESPN', PlayerESPN);