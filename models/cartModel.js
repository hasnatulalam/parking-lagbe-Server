const mongoose =require("mongoose");




const CartSchema =new mongoose.Schema({

   userId:{
     type:String,
     required:true,
   },
   parkings:[
    {
        parkingId:{
            type:String
        },
        quantity:{
            type:Number,
            default:1,
        },
    },
   ],
    
    

    

},{timestamps:true});

const cartModel =mongoose.model("cart",CartSchema);
module.exports =cartModel