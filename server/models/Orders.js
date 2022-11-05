const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    },
    orderTotal: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Orders', ordersSchema)