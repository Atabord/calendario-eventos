const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    salt: {
        required: true,
        type: String,
    },
});

module.exports = mongoose.model('User', User);