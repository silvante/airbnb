const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected to ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDataBase;
