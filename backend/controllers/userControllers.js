const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const role = req.user.role

    let users;
    if(role === "admin"){
      users = await User.find({})
    }else{
      users = await User.find({ role: "user"})
    }
    res.status(200).json({ message: "workong fine", users: users });
  } catch (error) {
    res.status(500).json({ message: "serverError" });
  }
};

module.exports = {getAllUsers };
