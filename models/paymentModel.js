const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    trxId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    slots: [
        { type: Number, required: true }
    ],
    bookingDate: {
        type: Object,
        required: true
    },
    bookingLocation: {
        type: String,
        required: true
    },
    paymentTimeStamp: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Payment', paymentSchema)