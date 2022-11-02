const express =require("express");
const  {parkingAdd, updateParking, deleteParking, singleParking, allParkings } = require("../controllers/parkingController");
const  Parking= require("../models/parkingModel")
const { checkIsUserAuthenticated, verifyTokenAndAdmin } = require("../middlewares/authMiddleware");





const router = express.Router();

router.post("/addparking",checkIsUserAuthenticated, parkingAdd)
router.put("/update/:id", verifyTokenAndAdmin, updateParking)
router.delete("/delete/:id",verifyTokenAndAdmin,deleteParking)
router.get("/singleParking/:id", verifyTokenAndAdmin,singleParking)
router.get("/allParkings",verifyTokenAndAdmin,allParkings)

module.exports =router