
const { checkIsUserAuthenticated } = require("../middlewares/authMiddleware");
const authModel = require("../models/authModel");
const parking =require("../models/parkingModel")

const router =require("express").Router()



//Parking Add

const parkingAdd= async (req,res)=>{


 
 
    const newParking =new parking(req.body)
    
    try {
 
        const saveParking = await newParking.save()
        if ( saveParking) {
           return res
            .status(200)
            .json({ message: "Your Parking form Successfully Done",  parking:  saveParking });
            //console.log(saveParking);
        }
      
     else {
      return res.status(400).json({ message: "all fields are required" });
    }
  
        
    } catch (error) {
        res.status(500).json(error)
    }

  }



    



const updateParking= async (req, res) => {
    try {
      const updateParking = await parking.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateParking);
    } catch (err) {
      res.status(500).json(err);
    }
  }; 

  const deleteParking =async(req,res)=>{
    try {
      await parking.findById(req.params.id)
      res.status(200).json("Delete Your Parking Address")
    } catch (error) {
      res.status(500).json(err);
    }
  }

  const singleParking =async(req,res)=>{
    try {
      const singleParking =await parking.findById(req.params.id)
      res.status(200).json({ message: "Your Single  Parking has successfully Find",  parking: singleParking})
    } catch (error) {
      res.status(500).json(err);
    }
  }

  const allParkings =async(req,res)=>{
    try {
       const allParkings =await parking.find()
       res.status(200).json(allParkings)
    } catch (error) {
      
    }
  }

module.exports ={
    parkingAdd,
    updateParking,
    deleteParking,
    singleParking,
    allParkings
   
}