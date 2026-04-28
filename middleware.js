const Review = require("./models/review.js");
const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js"); 

//checking is user is logged in or not
module.exports.isLoggedIn = (req,res,next)=>
{
    if(!req.isAuthenticated())          
    {
        // console.log(req.get("referer"));
        req.session.redirectUrl = req.originalUrl;
        // req.session.redirectUrl = req.get("referer");
        req.flash("error","To add listing you must logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.isLoggedInReview = (req,res,next)=>
{
    if(!req.isAuthenticated())          //checking is user is logged in or not
    {
        // we redirect using referer bcz on clicking delete button of review
        // then its goes url listing/:id/review/:reviewId but if that time user not 
        // logged in then it goes wrong.
        req.session.redirectUrl = req.get("referer");
        req.flash("error","To add listing you must logged in");
        return res.redirect("/login");
    }
    next();
}
//store originalUrl from where you goes on loginPage
module.exports.saveRedirectUrl = (req,res,next)=>
{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();
}
// Checking is logged user is owner of Listing
module.exports.isOwner = async(req,res,next)=>
{
    let {id} = req.params;

    let listing = await Listing.findById(id).populate("owner");

    if(! listing.owner._id.equals(res.locals.currUsr._id)) 
    {
        req.flash("error","You are not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }  
    next();
}

// Checking is logged user is Author of review
module.exports.isAuthor = async(req,res,next)=>
{
    let {id ,reviewId} = req.params;

    let review = await Review.findById(reviewId);

    if(! review.author.equals(res.locals.currUsr._id)) 
    {
        req.flash("error","You are not Author of this review");
        return res.redirect(`/listings/${id}`);
    }  
    next();
}

// Server-side schema validation for listing
module.exports.validateListing = (req,res,next)=>
{
    let {error} = listingSchema.validate(req.body);
    if(error)
    {
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else
    {
        next();
    }
}

// Server side validation for Review-schema
module.exports.validateReview = (req,res,next)=>
{
    console.log(req.body);
    let {error} = reviewSchema.validate(req.body);
    if(error)
    {
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else
    {
        next();
    }
}