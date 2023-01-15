const mongoose =require("mongoose");

const complainSchema = new mongoose.Schema({

 
  description:{
    type: String,
  },
  email:{
    type: String,
  }
 
 
});

const complainModel = mongoose.model("complain", complainSchema);
module.exports =complainModel