const mongoose =require("mongoose");




const OrderSchema =new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
   parkingSlotId:{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: "parkingSlot",
    required: true,
    },
   

   address:{
    type:Object,
    required:true
   },
   status:{
    type:String,
    required:true,
    default:"pending",
   }
    
    

    

},{timestamps:true});

const oderModel =mongoose.model("Order",OrderSchema);
module.exports = oderModel