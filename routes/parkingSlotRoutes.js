const express = require("express")


const parkingSlot = require("../models/parkingSlotModel.js")
const { checkIsUserAuthenticated, verifyTokenAndAdmin } = require("../middlewares/authMiddleware.js")
const { createParkingSlot, updateParkingSlot, deleteParkingSlot, singleParkingSlot, allParkingsSlot, updateParkingSlotAvailability, deleteParkingSlots } = require("../controllers/parkingSlotController.js")






const router = express.Router()

router.post("/createParkingSlot/:parkingid",  createParkingSlot)
router.put("/updateParkingSlot/:id",  updateParkingSlot)
router.delete("/deleteParkingSlots/:id/", deleteParkingSlots)
router.get("/singleParkingSlot/:id",  singleParkingSlot)
router.put("/availability/:id", updateParkingSlotAvailability)
router.get("/allParkingSlot", allParkingsSlot)
module.exports = router