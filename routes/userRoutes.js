 const  express = require("express");
const { getUser, getAllUsers, deleteUser, updateUser } = require("../controllers/userController.js");
const  {verifyTokenAndAdmin, verifyTokenAndAuthorization}  = require("../middlewares/authMiddleware.js");





const router = express.Router();



router.get("/getuser/:id", getUser);
router.get("/getallusers",  getAllUsers)
router.delete("/deleteuser/:id",deleteUser)
router.put("/update/:email",verifyTokenAndAdmin,updateUser )


  

  

module.exports= router; 