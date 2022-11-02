const express =require("express");

const  parkingSlot= require("../models/parkingSlotModel.js")
const { checkIsUserAuthenticated, verifyTokenAndAdmin } = require("../middlewares/authMiddleware.js");
const { createParkingSlot, updateParkingSlot, deleteParkingSlot, singleParkingSlot, allParkingsSlot } = require("../controllers/parkingSlotController.js");





const router = express.Router();

router.post("/createParkingSlot/:parkingId",checkIsUserAuthenticated, createParkingSlot )
router.put("/updateParkingSlot/:id", verifyTokenAndAdmin, updateParkingSlot)
router.delete("/deleteParkingSlot/:id/:parkingId",verifyTokenAndAdmin,deleteParkingSlot)
router.get("/singleParkingSlot/:id", verifyTokenAndAdmin,singleParkingSlot)
router.get("/allParkingSlot",verifyTokenAndAdmin,allParkingsSlot)

module.exports =router