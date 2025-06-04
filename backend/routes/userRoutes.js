const express = require("express");
const router = express.Router();
const { adminOnly, protect } = require("../middleware/authMiddleware");
const {getAllUsers} = require("../controllers/userControllers");

router.get("/getUser", protect, adminOnly, getAllUsers);

module.exports = router;
