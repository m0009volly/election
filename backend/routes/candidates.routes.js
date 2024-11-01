import express from "express";
import {
  getAllCandidates,
  createCandidate,
  deleteCandidate,
  getCandidateByPosition,
} from "../controller/candidates.controller.js";
import { adminAuth, candidateRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", candidateRoute, getAllCandidates);
router.get("/:position", getCandidateByPosition);
router.post("/", candidateRoute, adminAuth, createCandidate);
router.delete("/:id", candidateRoute, adminAuth, deleteCandidate);

export default router;
