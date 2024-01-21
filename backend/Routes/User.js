const express = require("express");
const { login, register, forgetPassword, resetPassword } = require("../Controllers/User");

const router = express.Router();

// Login Route
router.post("/login", login);

// Signup Route
router.post("/register", register);

// forget Password
router.post("/forgetPassword", forgetPassword);

// reset Password
router.post("/resetPassword", resetPassword);

module.exports = router;