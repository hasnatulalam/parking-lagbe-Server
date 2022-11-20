const mongoose =require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  message:{
    type: String,
  },
  rating:{
    type: Number,
  },
  isVerified: {
    type: Boolean,
  },
  isAdmin:{
    type:Boolean,
    default:false,
},
 
});

const authModel = mongoose.model("user", authSchema);
module.exports =authModel
