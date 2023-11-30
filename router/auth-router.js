const express = require("express");
const app = express();
const router = express.Router();
const authenticate = require('../middlewareTwo/authenticate')
const {register,login,dashboard} = require("../controllers/auth-controller");
const signUpSchema = require('../validators/auth-validator')
const validate = require('../middleware/validate-middleware')






router.route("/register").post(validate(signUpSchema),register);

router.route("/login").post(login)

router.route("/validuser").get(authenticate,dashboard)


module.exports = router;
