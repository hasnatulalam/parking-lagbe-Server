const parkingSlot =require("../models/parkingSlotModel.js")
const parking =require("../models/parkingModel")

const createParkingSlot = async (req, res) => {
    const parkingId = req.params.parkingid;
    const newParkingSlot = new parkingSlot(req.body);
  
    try {
      const savedParkingSlot = await newParkingSlot.save();
      try {
        await parking.findByIdAndUpdate(parkingId, {
          $push: { parkingSlot: savedParkingSlot._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedParkingSlot);
    } catch (err) {
      next(err);
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
        res.status(500).json(err);
    }
  }

  
  const deleteParkingSlot =async(req,res)=>{
    const parkingId = req.params.parkingid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await parking.findByIdAndUpdate(hotelId, {
          $pull: { parkingSlot: req.params.id },
        });
    } catch (err) {
        next(err);
      }
      res.status(200).json("Parking Slot  has been deleted.");
    } catch (err) {
        res.status(200).json("Parking Slot  has been deleted.");
    }
  };


  const singleParkingSlot =async(req,res)=>{
    try {
      const singleParkingSlot =await parkingSlot.findById(req.params.id)
      res.status(200).json({ message: "Your Single  Parking Slot has successfully Find",  parkingSlot: singleParkingSlot})
    } catch (error) {
      res.status(500).json(err);
    }
  }

  const allParkingsSlot =async(req,res)=>{
    try {
       const allParkingsSlot =await parkingSlot.find()
       res.status(200).json(allParkingsSlot)
    } catch (error) {
      
    }
  }


  module.exports={
    createParkingSlot,
    updateParkingSlot,
    deleteParkingSlot,
    singleParkingSlot,
    allParkingsSlot
  }