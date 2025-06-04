const mongoose = require("mongoose");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      status,
      reminderAt,
      assignedTo,
    } = req.body;
    console.log(req.body);
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
        status,
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
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user._id;
    let pending_tasks = 0;
    let inprogress_tasks = 0;
    let completed_tasks = 0;

    let tasks;

    if (role === "admin") {
      tasks = await Task.find()
        .populate({ path: "assignedTo", select: " -password -role" })
        .populate({ path: "createdBy", select: "-password -role" });
    } else if (role === "manager") {
      tasks = await Task.find({
        $or: [{ createdBy: userId }, { assignedTo: userId }],
      })
        .populate({ path: "assignedTo", select: "-password -role" })
        .populate({ path: "createdBy", select: "-password -role" });
    } else {
      tasks = await Task.find({ assignedTo: userId }).populate({
        path: "createdBy",
        select: "-password -role",
      });
    }

    for (const task of tasks) {
      if (task.status === "pending") {
        pending_tasks += 1;
      } else if (task.status === "in_progress") {
        inprogress_tasks += 1;
      } else {
        completed_tasks += 1;
      }
    }

    res.json({ tasks, completed_tasks, inprogress_tasks, pending_tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { createTask, deleteTask, updateTask, getTasks };
