const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

const dbMiddleware = async (req, res, next) => {
  if (!mongoose.connection.readyState) {
    throw new Error("MongoDB connection is not established");
  }
  req.db = mongoose.connection.db;
  next();
};

module.exports = { connectDB, dbMiddleware };

// module.exports = connectDB;
