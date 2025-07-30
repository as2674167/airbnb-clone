const mongoose = require("mongoose");
const initData = require("./data"); 
const Listing = require("../models/listing");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

main().then(() => { 
    console.log('Connected to MongoDB');
}).catch(err => { 
    console.log('Error connecting to MongoDB');
});

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '6883d4ce1894ad671171c924'}));
    await Listing.insertMany(initData.data);
    console.log("Data Inserted Successfully");

}

initDB();