const jwt =require("jsonwebtoken")
const authModel=require("../models/authModel")


  const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // verify token
      const { userID } = jwt.verify(token, "pleaseSubscribe");
    

      // Get User from Token
      req.user = await authModel.findById(userID).select("--password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "unAuthorized User" });
    }
  }

  else {
    return res.status(401).json({ message: "unAuthorized User you" });
  }
}  


const verifyTokenAndAuthorization = (req, res, next) => {
  checkIsUserAuthenticated(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  checkIsUserAuthenticated(req, res, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
}; 




 

    
  


  

 


 
    
         
       
 













 


 



















module.exports={
  checkIsUserAuthenticated,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,

  

}
  
 


 
 

 


