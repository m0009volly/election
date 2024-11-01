import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "candidate" },
  timestamp: { type: Date, default: Date.now },
});

export const Vote = mongoose.model("Vote", voteSchema);
