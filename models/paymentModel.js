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
    timestamp: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Payment', paymentSchema)