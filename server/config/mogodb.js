const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongoose connected successfully");
  } catch (err) {
    console.log("Mongoose connection failed:", err);
  }
};

module.exports = connectDB;
