const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,

    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    grandTotal:{
        type: Number,
    },
    userId:{
        type: String,
        required: true
    }
})

const carts = mongoose.model('carts',cartSchema)

module.exports = carts