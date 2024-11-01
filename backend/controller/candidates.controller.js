import { Candidate } from "../models/candidate.models.js";
import { Vote } from "../models/votes.models.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCandidateByPosition = async (req, res) => {
  try {
    const { position } = req.params;
    const candidates = await Candidate.find({ position });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCandidate = async (req, res) => {
  try {
    const { fullname, description, position, number, logo, image } = req.body;

    const candidate = await Candidate.create({
      fullname,
      description,
      position,
      number,
      logo,
      image,
    });

    if (candidate) {
      res
        .status(201)
        .json({ message: "candidate created successfully", candidate });
    } else {
      throw new Error("candidate not created");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "candidate not found" });
    }

    if (candidate.logo) {
      const publicId = candidate.logo.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`candidates/${publicId}`);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    if (candidate.image) {
      const publicId = candidate.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`candidates/${publicId}`);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    const deleteCandidate = await Candidate.findByIdAndDelete(id);

    const votes = await Vote.find({ candidate: id });
    for (const vote of votes) {
      await Vote.findByIdAndDelete(vote._id);
    }

    if (deleteCandidate) {
      res.json({ message: "candidate deleted successfully" });
    } else {
      throw new Error("candidate not deleted");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
