const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRETKEY, {
    expiresIn: "7d",
  });
};

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  adminInviteToken: Joi.string().allow("").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    console.log(value, "krishna");

    if (error) {
      return res
        .status(400)
        .json({ message: `⚠️ ${error.details[0].message}` });
    }

    const { name, email, password, adminInviteToken } = value;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "⚠️ User already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let role = "user";
    if (
      adminInviteToken &&
      adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    } else if (
      adminInviteToken &&
      adminInviteToken !== process.env.ADMIN_INVITE_TOKEN
    ) {
      return res.status(401).json({ message: "Enter valid admin token" });
    }

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: role,
    });

    // Return user data without password
    res.status(201).json({
      message: "🎉 Registration successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error!", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ message: `⚠️ ${error.details[0].message}` });
    }
    const { email, password } = value;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    res.status(200).json({
      message: "🎉 Login successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error!", error: error.message });
  }
};

module.exports = { loginUser, registerUser };
