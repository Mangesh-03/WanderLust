const mongoose =  require("mongoose");
const schema = mongoose.Schema ;
const Review = require("./review.js");

const listingSchema = new schema(
    {
        title :
        {
            type : String,
            required : true
        },
        description : String,
        
        image: {
            filename: {
            type: String,
            default: "listingimage",
            },
            url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1758904599709-18e6b94a1c77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            set: (v) =>
                !v || v.trim() === ""
                ? "https://images.unsplash.com/photo-1758904599709-18e6b94a1c77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                : v,
            },
        },
        price : Number,
        location : String,
        country : String,
        owner : {
            type : schema.Types.ObjectId,
            ref : "User"
        },
        
        reviews : 
        [
            {
                type : schema.Types.ObjectId,
                ref : "Review"
            }
        ]
    }
);

listingSchema.post("findOneAndDelete",async(listing)=>
{
    if(listing)
    {
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing