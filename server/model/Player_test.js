const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlayerTest = new Schema({

},
    { strict: false }
);

module.exports = mongoose.model("PlayerTest", PlayerTest);
