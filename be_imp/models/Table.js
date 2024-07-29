const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  tablename: {
    type: String,
    required: [true, "Please add a table name"],
    unique: true,
  },
  createdBy: {
    type: String,
    required: [true, "Please add an username"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Table", TableSchema);
