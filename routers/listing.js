const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listingController.js");

const router = express.Router({mergeParams: true});
const multer  = require('multer');
const {storage} = require("../cloud_config.js");
const upload = multer({ storage })


router.route("/")
.get(wrapAsync(listingController.Index))        // index route
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);    // newlisting route  to save in database


router.get("/new",isLoggedIn,listingController.renderNewForm);          // render form for new listing

router.route("/:id")
.get(wrapAsync(listingController.showListing))          // Display single listing from all listings
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))     // update 
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))          //


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;