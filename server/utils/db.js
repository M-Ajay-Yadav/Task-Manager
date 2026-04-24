const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });



const URI = process.env.MONGO_URI;
// const URI = "mongodb://127.0.0.1:27017/mern_admin_panel";
console.log("MONGO_URI:", process.env.MONGO_URI);
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
    
  } catch (error) {
    console.error("database connection fail", error.message);
    process.exit(0);
  }
};

module.exports = connectDb;