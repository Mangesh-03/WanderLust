const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js")
const { isLoggedInReview,isAuthor,validateReview} = require("../middleware.js");
const router = express.Router({mergeParams: true});
const ReviewController = require("../controllers/reviewController.js");

//Post Reviews route
router.post("/",isLoggedInReview,validateReview,wrapAsync(ReviewController.createNewReview));

//Delete review route
router.delete("/:reviewId",isLoggedInReview,isAuthor,wrapAsync(ReviewController.deleteReview));

module.exports = router;