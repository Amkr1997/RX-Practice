const mongoose = require("mongoose");
require("dotenv").config({
  path: `.env`,
});

const initializeDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

  try {
    const connection = await mongoose.connect(mongoUri);

    if (connection) {
      console.log("Connected to mongoDb");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initializeDatabase };
