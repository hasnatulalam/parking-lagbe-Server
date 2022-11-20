const express =require("express");
const  {parkingAdd, updateParking, deleteParking, singleParking, allParkings, countByCity, countByType, getParkingSlot, searchByCity, getAllParkings } = require("../controllers/parkingController");
const  Parking= require("../models/parkingModel")
const { checkIsUserAuthenticated, verifyTokenAndAdmin } = require("../middlewares/authMiddleware");






const router = express.Router();

router.post("/addparking",verifyTokenAndAdmin, parkingAdd)
router.put("/update/:id",  updateParking)
router.delete("/delete/:id",deleteParking)
router.get("/singleParking/:id", singleParking)
router.get("/search/:name",searchByCity)
router.get("/allParkings", allParkings)
router.get("/AllParkings", getAllParkings)
router.get("/allParkings/countByCity",  countByCity)
router.get("/allParkings/countByType", countByType)
router.get("/allParkings/parkingSlot/:id" ,getParkingSlot)



module.exports =router