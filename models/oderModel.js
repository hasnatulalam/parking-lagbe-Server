const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  slotNumbersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "parkingSlot",
    required: true,
  },
})

const oderModel = mongoose.model("Order", OrderSchema)
module.exports = oderModel