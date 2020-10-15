const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Event = new Schema({
    title: {
        required: true,
        type: String,
    },
    start: {
        required: true,
        type: String,
    },
    end: {
        type: String,
    },
    userId: {
        required: true,
        type: String,
    },
});

module.exports = mongoose.model('Event', Event);