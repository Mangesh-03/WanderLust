const User = require("../models/user.js");

// Render signup form
module.exports.renderSignupForm = (req,res)=>
{
    res.render("users/signup.ejs");
};

// Register new User
module.exports.registerNewUser = async(req,res,next)=>
{
    try{
        let {username ,email,password} = req.body;

        console.log("username:",username);
         console.log("email:",email);
          console.log("pass:",password);

        const newUser = new User({username,email});
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);

        req.login(registerUser,(err)=>
        {
            if(err)
            {
                return next(err);
            }

            req.flash("sucess","Welcome to wanderlust");
            return res.redirect("/listings");
        })

    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>
{
    res.render("users/login.ejs");
};

module.exports.LoginUser = async(req,res)=>{

    let redirectUrl = res.locals.redirectUrl || "/listings";
    req.flash("sucess","Welcome to back to wander lust!");
    res.redirect(redirectUrl);
   
};

module.exports.LogOut = (req,res,next)=>
{
    req.logOut((err)=>
    {
        if(err)
        {
            return next(err);
        }
        req.flash("sucess","logout successfully");
        res.redirect("/listings");
    })
};

