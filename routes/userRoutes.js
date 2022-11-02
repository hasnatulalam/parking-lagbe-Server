 const  express = require("express");
const { getUser, getAllUsers, deleteUser } = require("../controllers/userController.js");
const  {verifyTokenAndAdmin, verifyTokenAndAuthorization}  = require("../middlewares/authMiddleware.js");





const router = express.Router();



router.get("/getuser/:id", verifyTokenAndAdmin,getUser);
router.get("/getallusers", verifyTokenAndAdmin, getAllUsers)
router.delete("/deleteuser/:id",verifyTokenAndAdmin,deleteUser)


  

  

module.exports= router; 