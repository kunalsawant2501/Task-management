const express = require("express");
const { adminOnly, protect } = require("../middleware/authMiddleware");
const {
  createTask,
  deleteTask,
  updateTask,
  getTask,
} = require("../controllers/taskControllers");

const router = express.Router();

router.post("/", protect, adminOnly, createTask);
router.delete("/:id", protect, adminOnly, deleteTask);
router.put("/:id", protect, updateTask);
router.get("/", protect, getTask);

module.exports = router;
