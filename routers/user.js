const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/userController.js");

router.route("/")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login' ,
        failureFlash:true 
        }),
        wrapAsync(userController.LoginUser)
)

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.registerNewUser))

router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login' ,
        failureFlash:true 
        }),
        wrapAsync(userController.LoginUser)
)

// // signUp form render
// router.get("/signup",userController.renderSignupForm);

// signUp new user Complete
// router.post("/signup",wrapAsync(userController.registerNewUser));

// login form render
// router.get("/login",userController.renderLoginForm);

// // login user
// router.post(
//     "/login",saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect: '/login' ,
//         failureFlash:true 
//         }),
//         wrapAsync(userController.LoginUser)
// );

// logout user
router.get("/logout",userController.LogOut);

module.exports = router;