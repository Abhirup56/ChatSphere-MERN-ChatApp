import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const verified = jwt.verify(token, process.env.JWT_token);
    if (!verified || !verified.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("JWT middleware error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default secureRoute;
