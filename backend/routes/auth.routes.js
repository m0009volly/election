import express from "express";
import {
  login,
  logOut,
  register,
  getProfile,
  refreshToken,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/refresh-token", refreshToken);
router.get("/profile", getProfile);

export default router;
