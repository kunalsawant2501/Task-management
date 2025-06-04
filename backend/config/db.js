const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("database connected succefully");
  } catch (error) {
    console.log("database not connected" + error);
    process.exit(1);
  }
};

module.exports = connectDB;
