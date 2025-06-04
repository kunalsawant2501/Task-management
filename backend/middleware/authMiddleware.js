const jwt = require("jsonwebtoken");
const User = require("../models/User");
let middleware = {};

middleware.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "⛔ Not Authorized, no token provided!" });
    }
  } catch (error) {
    res.status(401).json({
      message: "❌ Token verification failed!",
      error: error.message,
    });
  }
};

middleware.adminOnly = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      const foundUser = await User.findById(decoded.id).select("-password");

      if (foundUser && foundUser.role === "admin") {
        req.user = foundUser;
        next();
      } else {
        res.status(403).json({ message: "⛔ Forbidden: Admins only!" });
      }
    } else {
      res.status(401).json({ message: "⛔ Not Authorized, no token provided!" });
    }
  } catch (error) {
    res.status(401).json({
      message: "❌ Token verification failed!",
      error: error.message,
    });
  }
};

module.exports = middleware;
