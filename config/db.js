const mongoose = require("mongoose");
const config = require("./config.json");

/* const connectDB = () => {
  console.log(config.mongoURI);
}; */

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
