const express = require("express");
const {
  getTable,
  getTables,
  createTable,
  getUserDataById,
  deleteTable,
} = require("../controllers/tables");

const Table = require("../models/Table");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
// const { protect, authorize } = require("../middleware/auth");

// router.use(protect);
// router.use(authorize("admin"));

router.route("/").get(advancedResults(Table), getTables).post(createTable);

router.route("/:id").get(getTable).delete(deleteTable);

router.route("/:id/:userId").get(getUserDataById);

module.exports = router;
