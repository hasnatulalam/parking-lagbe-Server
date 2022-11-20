const mongoose =require("mongoose");

const reviewSchema = new mongoose.Schema({

  rating:{
    type: Number,
  },
 
 
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports =reviewModel