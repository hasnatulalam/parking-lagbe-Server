const parkingSlot =require("../models/parkingSlotModel.js")
const parking =require("../models/parkingModel.js")
const user =require("../models/authModel.js")





// const stripe = require("stripe")(process.env.STRIPE_KEY);


const createParkingSlot = async (req, res) => {
  const parkingId = req.params.parkingid;
  const newParkingSlot = new parkingSlot(req.body);

  try {
    const savedParkingSlot = await newParkingSlot.save();
    try {
      await parking.findByIdAndUpdate(parkingId, {
        $push: { slots: savedParkingSlot._id },
       
      });
    } catch (error) {
      res.status(500).json(error);
    }
    res.status(200).json(savedParkingSlot);
  } catch (error) {
    res.status(500).json(error);
  }
};

  const updateParkingSlot = async(req,res)=>{
    try {
        const updateParkingSlot =await parkingSlot.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            {
                new :true
            }
            )

            res.status(200).json(updateParkingSlot)


    } catch (error) {
        res.status(500).json(error);
    }
  }

  
  const deleteParkingSlot =async(req,res)=>{
    const parkingId = req.params.parkingid;
    try {
      await parkingSlot.findByIdAndDelete(req.params.id);
      try {
        await parking.findByIdAndUpdate(parkingId, {
          $pull: { slots: req.params.id },
         
        });
    } catch (error) {
      res.status(500).json(error);
      }
      res.status(200).json("Parking Slot  has been deleted.");
    } catch (error) {
        res.status(200).json("Parking Slot  has been deleted.");
    }
  };

  const updateParkingSlotAvailability = async (req, res) => {
    try {
      await parkingSlot.updateOne(
        { "slotNumbers._id": req.params.id },
        {
          $push: {
            "slotNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (error) {
      res.status(200).json("Room status has been updated.");
    }
  };


  const singleParkingSlot =async(req,res)=>{
    try {
      const singleParkingSlot =await parkingSlot.findById(req.params.id)
      res.status(200).json({ message: "Your Single  Parking Slot has successfully Find",  parkingSlot: singleParkingSlot})
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const allParkingsSlot =async(req,res)=>{
    try {
       const allParkingsSlot =await parkingSlot.find()
       res.status(200).json(allParkingsSlot)
    } catch (error) {
      res.status(500).json(error);
    }
  }

  const deleteParkingSlots = async (req, res) => {
    try {
      const deleteParkingSlots = await parkingSlot.findByIdAndDelete(req.params.id);
      
      res.status(200).json(deleteParkingSlots);
    } catch (err) {
      res.status(500).json(err);
    }
    };

     const myBookingSlots =async(req,res)=>{
      try {
        const myBooking = await parkingSlot.find({ userId: req.params.userId });
        res.status(200).json(myBooking);
      } catch (error) {
        res.status(500).json(error);
      }

    } 


   

  


  module.exports={
    createParkingSlot,
    updateParkingSlot,
    deleteParkingSlot,
    singleParkingSlot,
    allParkingsSlot,
    deleteParkingSlots,
    updateParkingSlotAvailability,
 
  }