const express =require("express")
const {checkIsUserAuthenticated}=require("../middlewares/authMiddleware")

const {userRegistration, userLogin, userLogout, forgetPassword, forgetPasswordEmail, saveVerifiedEmail, changePassword, Contact} =require("../controllers/authController.js")

const router = express.Router();

//only every user send email
router.post("/contact",Contact)

router.post("/users/register",  userRegistration);
router.post("/users/login", userLogin);
router.get("/users/logout",userLogout)


// Forget Password

router.post("/forget-password",forgetPassword);
router.post("/forget-password/:id/:token", forgetPasswordEmail);

// Email Verification

router.get("/verify/:token", saveVerifiedEmail);

// Protected Routes

router.post(
  "/change-password",
 
 
  changePassword
);
module.exports =router

