const mongoose =require("mongoose");




const OrderSchema =new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
   parkingId:{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
    required: true,
    },
   
   amount:{
     type:Number,
     required:true,
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

const oderModel =mongoose.model("order",OrderSchema);
module.exports = orderModel