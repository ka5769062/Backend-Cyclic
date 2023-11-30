const User = require("../models/user-model");
const bycrypt = require("bcryptjs");
const cookie = require('cookie-parser')


const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // console.log(req.body);
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400).json({ msg: "user already exist" });
    }

    const saltRound = 10;
    const hash_password = await bycrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    res
      .status(200)
      .json({
        msg: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    console.log(error);
  }
};

// login here

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    // console.log(userExist);

    if (!userExist) {
      res.status(400).json({ msg: "invalid credentials" });
    }

    const user = await bycrypt.compare(password, userExist.password);
    const myToken = await userExist.generateToken() 
    // console.log(user);

    if (user) {
      res
        .status(200).json({
          msg: "login successful",
          token: myToken,
          userId: userExist._id.toString(),
           
          })

    } 
   
    else {
       res.status(401).json({ msg: "invalid email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};

//  user Valid

 const dashboard = async(req,res) =>{

try {
  
  const validUserOne = await User.findOne({_id:req.userId}) 
  res.status(201).json({status:201,validUserOne})

} catch (error) {

  res.status(401).json({ msg:error });

}

}










module.exports = { register, login,dashboard };
