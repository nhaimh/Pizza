const mongoose = require('mongoose');

const orderedProductsSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('OrderedProducts', orderedProductsSchema)