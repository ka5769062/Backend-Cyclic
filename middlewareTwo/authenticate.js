const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
        
    // console.log(token);

    verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({ _id: verifyToken.userId });
    console.log(verifyToken);

    if (!rootUser) {
      throw new Error("user not found");
    }
     
    req.token = token 
    req.rootUser = rootUser
    req.userId = rootUser._id


    next();
  } catch (error) {
    res.status(401).json({status:401,msg:"unauthorized no token provided"})
  }
};

module.exports = authenticate;
