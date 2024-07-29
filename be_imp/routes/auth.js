const express = require("express");
const {
  register,
  login,
  getMe,
  isPasswordChanged,
  logout,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/passwordChange", protect, isPasswordChanged);
router.get("/logout", protect, logout);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
