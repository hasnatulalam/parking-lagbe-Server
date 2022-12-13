const mongoose =require("mongoose");

const reviewSchema = new mongoose.Schema({

  rating:{
    type: Number,
  },
  description:{
    type: String,
  },
  email:{
    type: String,
  }
 
 
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports =reviewModel