const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createNewReview = async(req,res)=>
{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    console.log(newReview);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("sucess","New review Created");

    res.redirect(`/listings/${listing._id}/`)
};

module.exports.deleteReview = async(req,res)=>
{
    let {id ,reviewId} = req.params;
    console.log(req.referer);
    await Listing.findByIdAndUpdate(id,{$pull :{ reviews : reviewId}});

    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess","Review deleted");
    res.redirect(`/listings/${id}`);
};