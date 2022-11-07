const express =require("express");
const { addOder } = require("../controllers/oderController");

const { checkIsUserAuthenticated, verifyTokenAndAdmin } = require("../middlewares/authMiddleware");





const router = express.Router();

router.post("/addoder",checkIsUserAuthenticated, addOder)


module.exports =router