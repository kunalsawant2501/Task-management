const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ message: "workong fine", users: users });
  } catch (error) {
    res.status(500).json({ message: "serverError" });
  }
};

module.exports = getAllUsers;
