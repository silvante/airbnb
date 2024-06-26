const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`mongodb connected to ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDataBase;
