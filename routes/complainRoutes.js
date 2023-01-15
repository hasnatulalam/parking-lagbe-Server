const express =require("express")


const {complainAdd,getAllComplain} =require("../controllers/complainController.js")

const router = express.Router();

//only every user send email
router.post("/addcomplain",complainAdd)
router.get("/collectcomplains",getAllComplain)


module.exports =router