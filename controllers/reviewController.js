const  review =require("../models/reviewModel.js");



//review add
const reviewAdd= async (req,res)=>{

 
 
 
    const newReview =new review(req.body)
    
    try {
 
        const saveReview = await newReview.save()
       
      
   
      return res.status(400).json(saveReview);
  
  
        
    } catch (error) {
        res.status(500).json(error)
    }

  }


  const getAllReview = async (req, res) => {
    try {
      const Review = await review.find()
     
      res.status(200).json(Review)
    } catch (err) {
      res.status(200).json(err)
    }
  };




  module.exports ={reviewAdd,getAllReview}


 