const mongoose =require("mongoose");
const parkingSlotSchema = new mongoose.Schema(
 

    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
  
    
    
      slotNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
    
    },
    
    { timestamps: true }
  );

  const parkingSlotModel =mongoose.model("parkingSlot",parkingSlotSchema)
  module.exports =parkingSlotModel
  