const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Feedback', feedbackSchema)