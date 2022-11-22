const mongoose =require("mongoose");

const reviewSchema = new mongoose.Schema({

  rating:{
    type: Number,
  },
  price:{
    type: Number,
  },
  name:{
    type: String,
  }
 
 
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports =reviewModel