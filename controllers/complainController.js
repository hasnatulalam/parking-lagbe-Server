const  complain =require("../models/complainModel");



//review add
const complainAdd= async (req,res)=>{

 
 
 
    const newComplain =new complain(req.body)
    
    try {
 
        const saveComplain = await newComplain.save()
       
      
   
      return res.status(400).json(saveComplain);
  
  
        
    } catch (error) {
        res.status(500).json(error)
    }

  }


  const getAllComplain = async (req, res) => {
    try {
      const Complain = await complain.find()
     
      res.status(200).json(Complain)
    } catch (err) {
      res.status(200).json(err)
    }
  };




  module.exports ={complainAdd,getAllComplain}


 