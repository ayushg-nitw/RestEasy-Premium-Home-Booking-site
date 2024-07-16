const express = require("express");
const router = express.Router();
const warapAsync= require("../utils/wrapAsync.js");
const User= require("../models/user.js")
const passport= require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");

router.get("/signup",userController.renderSignupForm);

router.post("/signup", warapAsync(userController.signup));

router.get("/login",userController.renderLoginForm);

router.post("/login", saveRedirectUrl, userController.login);

 router.get("/logout",userController.logout);

module.exports= router;