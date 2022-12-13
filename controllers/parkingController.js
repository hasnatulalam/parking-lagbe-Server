
const { checkIsUserAuthenticated } = require("../middlewares/authMiddleware")
const authModel = require("../models/authModel")
const parking = require("../models/parkingModel")

const parkingSlot = require("../models/parkingSlotModel")

const router = require("express").Router()



//Parking Add
const parkingAdd= async (req,res)=>{


 
 
  const newParking =new parking(req.body)
  
  try {

      const saveParking = await newParking.save()
      
         
      res.status(200).json(saveParking);
         
        
   
    
 

      
  } catch (error) {
      res.status(500).json(error)
  }

}







const updateParking = async (req, res) => {
  try {
    const updateParking = await parking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updateParking)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteParking = async (req, res) => {
  try {
   const deleteParking= await parking.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteParking)
  } catch (error) {
    res.status(500).json(error)
  }
}

const singleParking = async (req, res) => {
  try {
    const singleParking = await parking.findById(req.params.id)
    res.status(200).json(singleParking)
  } catch (error) {
    res.status(500).json(error)
  }
}

const allParkings = async (req, res) => {
  const { min, max, ...others } = req.query
  try {
    const parkings = await parking.find({
      ...others,
      cheapestPrice: { $gt: min || 10, $lt: max || 3000 },
    }).limit(req.query.limit)
    res.status(200).json(parkings)
  } catch (err) {
    res.status(500).json("Parking No found")
  }
}

const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return parking.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (error) {
    res.status(500).json(error)
  }
}

const searchByCity = async (req, res) => {
  try {
    const findname = req.params.name
    const objs = await parking.find({ productName: { $regex: '.*' + findname + '.*' } })
    res.json(objs)
  } catch (error) {
    res.json({ message: error })
  }
}

const countByType = async (req, res) => {
  try {
    const mallCount = await parking.countDocuments({ type: "mall" })
    const apartmentCount = await parking.countDocuments({ type: "apartment" })
    const parkingSpaceCount = await parking.countDocuments({ type: "parkingSpace" })


    res.status(200).json([
      { type: "mall", count: mallCount },
      { type: "apartment", count: apartmentCount },
      { type: "parkingSpace", count: parkingSpaceCount },

    ])
  } catch (error) {
    res.status(500).json(error)
  }
}

const getParkingSlot = async (req, res) => {
  try {
    const Parking = await parking.findById(req.params.id)
    const list = await Promise.all(
      Parking.slots.map((slot) => {
        return parkingSlot.findById(slot)
      })
    )
    res.status(200).json(list)
  } catch (err) {
    res.status(200).json(err)
  }
}

const getAllParkings = async (req, res) => {
  const query = req.query.new
  try {
    const parkings = query
      ? await parking.find().sort({ _id: -1 }).limit(5)
      : await parking.find()
    res.status(200).json(parkings)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getParkingsBySearch = async (req, res) => {
  const { src } = req.params
  const { min, max } = req.query
  try {
    let parkings = []
    if (parseInt(min) && parseInt(max)) {
      parkings = await parking.find({ cheapestPrice: { $gt: parseInt(min), $lt: parseInt(max) } })
    } else if (parseInt(max) && !parseInt(min)) {
      parkings = await parking.find({ cheapestPrice: { $lt: parseInt(max) } })
    } else if (parseInt(min) && !parseInt(max)) {
      parkings = await parking.find({ cheapestPrice: { $gt: parseInt(min) } })
    } else {
      parkings = await parking.find()
    }
    const matched = parkings.filter(area => area.name.toLowerCase().includes(src.toLowerCase()))
    res.status(200).json(matched)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  parkingAdd,
  updateParking,
  deleteParking,
  singleParking,
  allParkings,
  countByCity,
  countByType,
  getParkingSlot,
  searchByCity,
  getAllParkings,
  getParkingsBySearch
}