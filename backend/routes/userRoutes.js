const express = require("express");
const router = express.Router();
const { adminOnly } = require("../middleware/authMiddleware");
const getAllUsers = require("../controllers/userControllers");

router.get("/getUser", adminOnly, getAllUsers);

module.exports = router;
