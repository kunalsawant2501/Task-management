const express = require("express");
const { adminOnly, protect } = require("../middleware/authMiddleware");
const {
  createTask,
  deleteTask,
  updateTask,
  getTask,
  getTasks
} = require("../controllers/taskControllers");

const router = express.Router();

router.post("/", protect, adminOnly, createTask);
router.delete("/:id", protect, adminOnly, deleteTask);
router.put("/:id", protect, updateTask);
router.get("/", protect, getTask);
router.get("/getTasks", protect, getTasks) 

module.exports = router;
