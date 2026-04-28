if(process.env.NODE_ENV != "Production")
{
    require('dotenv').config()
}

console.log(process.env.SECRET)

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routers/listing.js");
const reviewRouter = require("./routers/review.js");
const userRouter = require("./routers/user.js");

const port = 8080;

const DB_URL = process.env.ATLASDB

const app = express();

main()
.then(()=>
{
    console.log("Connection sucessful");
})
.catch((err) => console.log(err));

async function main() 
{
    
    try {
        await mongoose.connect(DB_URL);       
         console.log("DB CONNECTED");
    } catch (err) {
        console.log("DB ERROR:", err);
    }
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: DB_URL,
    touchAfter: 24 * 3600,
});



store.on("error",(err)=>
{
    console.log("Error in mongo Session store : ",err);
})

const sesionOptions = {
    store : store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized  : false,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}


app.use(session(sesionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>
{
    res.locals.success = req.flash("sucess");
    res.locals.error = req.flash("error");
    res.locals.currUsr = req.user;
    next();
})


app.use("/listings",listingsRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/",userRouter);


app.all(/.*/,(req,res,next)=>
{
    next(new ExpressError(404,"Page not found!"));
});

app.use((err,req,res,next)=>
{   
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("listing/error.ejs",{message});
});

app.listen(port,()=>
{
    console.log("Server stated at port 8080");
});
