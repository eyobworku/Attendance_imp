const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Table = require("../models/Table");

// @desc      Get all tables
// @route     GET /api/v1/tables
// @access    Private/Admin
exports.getTables = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single tables
// @route     GET /api/v1/tables/:id
// @access    Private/Admin
exports.getTable = asyncHandler(async (req, res, next) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    return next(
      new ErrorResponse(`No table with the id of ${req.params.id}`, 404)
    );
  }
  const tableName = table.tablename;
  const collection = req.db.collection(tableName);

  const fetchedData = await collection.find({}).toArray();

  res.status(200).json({
    success: true,
    data: fetchedData,
  });
});
// @desc      Get single tables and get data by user ID
// @route     GET /api/v1/tables/:id/:userId
// @access    Private/Admin
exports.getUserDataById = asyncHandler(async (req, res, next) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    return next(
      new ErrorResponse(`No table with the id of ${req.params.id}`, 404)
    );
  }
  const tableName = table.tablename;
  const collection = req.db.collection(tableName);

  const fetchedData = await collection
    .find({ Id: { $regex: `^${req.params.userId}$`, $options: "i" } })
    .toArray();

  res.status(200).json({
    success: true,
    data: fetchedData,
  });
});

// @desc      Create table
// @route     POST /api/v1/tables
// @access    Private/Admin
exports.createTable = asyncHandler(async (req, res, next) => {
  const { excelData, userName, tablename } = req.body;
  const collection = req.db.collection(tablename);
  await collection.insertMany(excelData);
  const table = await Table.create({ tablename, createdBy: userName });

  res.status(201).json({
    success: true,
    data: table,
  });
});

// @desc      Delete table by id
// @route     POST /api/v1/tables/:id
// @access    Private/Admin
exports.deleteTable = asyncHandler(async (req, res, next) => {
  const { tablename } = req.body;
  if (!tablename) {
    return res.status(400).json({
      success: false,
      message: "Table name is required",
    });
  }
  const collection = req.db.collection(tablename);
  await collection.drop();
  const result = await Table.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    return res.status(404).json({
      success: false,
      message: "Table not found",
    });
  }

  res.status(201).json({
    success: true,
  });
});
