const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateToken = function async(){

 try {
  
  return jwt.sign({
    userId: this._id.toString(),
    email:this.email,
    isAdmin:this.isAdmin
  },
  process.env.SECRET_KEY,{
    expiresIn:"1d",
  }
  )

 } catch (error) {
  console.log(error);
 } 

}


const User = new mongoose.model("users",userSchema)
module.exports = User