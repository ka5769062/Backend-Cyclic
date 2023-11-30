const { z } = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be 3 char" })
    .max(255,{message: "Name must not more than 255 char"}),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({message:"Invalid email address"})  
    .min(3, { message: "Email must be 3 char" })
    .max(255,{message: "Email must not more than 255 char"}),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "phone must be 10 digits" })
    .max(20,{message: "phone must not be more than 20 digits"}),  
 password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be 7 char" })
    .max(1024,{message: "Password can not be greater than 1024"})


});

module.exports = signUpSchema;