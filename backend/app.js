import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import auth from "./routes/auth.routes.js";
import vote from "./routes/vote.routes.js";
import candidates from "./routes/candidates.routes.js";
import contactUs from "./routes/contact-us.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow only this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/candidates", candidates);
app.use("/api/vote", vote);
app.use("/api/contact-us", contactUs);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(5000, () => {
  console.log("Server running on port" + PORT);

  connectDB();
});
