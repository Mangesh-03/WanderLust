const Listing = require("../models/listing.js");

module.exports.Index = async(req,res)=>
{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs",{allListing});
};

module.exports.renderNewForm = (req,res)=>
{
    console.log(req.user);              // req.user => have info about logged user 
    res.render("listing/NewListing.ejs");
};

module.exports.renderEditForm = async(req,res)=>
{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing)
    {
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);

    let originalImgUrl = listing.image.url;

    originalImgUrl.replace("/upload","/upload/h_300,w_300");

    listing.image.url = originalImgUrl;

    res.render("listing/edit.ejs",{listing});
};

module.exports.showListing = async(req,res)=>
{   
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path : "reviews",
        populate :{path : "author"}
    })
    .populate("owner");
    
    if(!listing)
    {
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let city = listing.location;
    let country = listing.country;

    const coords = await backward(city,country);

    console.log(listing);
    console.log(coords);

    console.log("API key : ",process.env.MAP_API);
    res.render("listing/show.ejs",{listing,mapAPI:process.env.MAP_API,coords});
};


module.exports.updateListing = async(req,res)=>
{
    let {id} = req.params;
    console.log(req.body);

   

    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof(req.file) !== "undefined")
    {
        const url = req.file.path;
        const filename = req.file.filename;

        listing.image.url = url;
        listing.image.filename = filename;

        await listing.save();
    }

    req.flash("sucess","Listing  updated");
    return res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res)=>
{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("sucess","Delete listing successfully");
    res.redirect("/listings");
};


module.exports.createListing = async (req, res, next) => {
    try {
        const url = req.file.path;
        const filename = req.file.filename;

        const location = req.body.listing.location;
        const country = req.body.listing.country;

        // 1. Get coordinates from your geocoding function
        const coords = await backward(location, country);
        console.log(coords);

        let NewListing = new Listing(req.body.listing);
        NewListing.owner = req.user._id;
        NewListing.image = { filename, url };
        
        await NewListing.save();
        
        req.flash("sucess", "New Listing added successfully");
        res.redirect("/listings"); // ONLY ONE RESPONSE CALL
    } catch (err) {
        next(err);
    }
};

let backward = async (city,country) => {

    const map_key = process.env.MAP_API_GEO;
    let link = `https://geocode.maps.co/search?city=${city}&country=${country}&api_key=${map_key}`;

    try {
        const response = await fetch(link);

        if (!response.ok) {
            const text = await response.text();  
            console.error("API ERROR:", text);
            return null;
        }

        const result = await response.json();

        if (!result || result.length === 0) {
            return null;
        }

        return {
            lat: result[0].lat,
            lng: result[0].lon
        };

    } catch (error) {
        console.error(error.message);
        return null;
    }
    
};  
