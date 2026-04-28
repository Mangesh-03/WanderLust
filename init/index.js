const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
.then(()=>
{
    console.log("Connection sucessful");
})
.catch((err) => console.log(err));

async function main() 
{
  await mongoose.connect(MONGO_URL);
}

const initDB = async()=>
{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner : "69de0849b3495fb7e225ff85"}));
    await Listing.insertMany(initData.data);

    console.log("Data saved");

}

initDB();