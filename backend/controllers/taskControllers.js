const mongoose = require("mongoose");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, reminderAt, assignedTo } =
      req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }

    const assignedIds = assignedTo.map((id) => new mongoose.Types.ObjectId(id));

    for (const userId of assignedIds) {
      const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        reminderAt,
        assignedTo: userId, // assign to one user at a time
        createdBy: req.user._id,
      });
    }

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { role } = req.query;
    console.log(role, "role");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
module.exports = { createTask, deleteTask, updateTask, getTask };
