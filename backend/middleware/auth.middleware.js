import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import dotenv from "dotenv";

dotenv.config();

export const candidateRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "unauthorized - Access Denied" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "unauthorized - user not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "unauthorized - Access Token Expired" });
      }
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden - Access Denied" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
