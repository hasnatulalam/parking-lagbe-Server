const express =require("express")


const {reviewAdd,getAllReview} =require("../controllers/reviewController.js")

const router = express.Router();

//only every user send email
router.post("/addreview",reviewAdd)
router.get("/collectreviews",getAllReview)


module.exports =router