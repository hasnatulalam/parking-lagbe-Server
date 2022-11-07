const express =require("express");
const  {parkingAdd, updateParking, deleteParking, singleParking, allParkings, countByCity, countByType, getParkingSlot } = require("../controllers/parkingController");
const  Parking= require("../models/parkingModel")
const { checkIsUserAuthenticated, verifyTokenAndAdmin } = require("../middlewares/authMiddleware");





const router = express.Router();

router.post("/addparking",checkIsUserAuthenticated, parkingAdd)
router.put("/update/:id",  updateParking)
router.delete("/delete/:id",deleteParking)
router.get("/singleParking/:id", singleParking)
router.get("/allParkings", allParkings)
router.get("/allParkings/countByCity",  countByCity)
router.get("/allParkings/countByType", countByType)
router.get("/allParkings/parkingSlot/:id" ,getParkingSlot)

module.exports =router