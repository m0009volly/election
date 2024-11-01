import express from "express";
import { sendMail } from "../controller/contact-us.controller.js";

const router = express.Router();

router.post("/", sendMail);

export default router;
