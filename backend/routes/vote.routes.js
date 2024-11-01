import express from "express";
import {
  vote,
  listUsersWithVotingInfo,
} from "../controller/vote.controller.js";
import { adminAuth, candidateRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", candidateRoute, vote);
router.get("/", candidateRoute, adminAuth, listUsersWithVotingInfo);

export default router;
