import mongoose from "mongoose";

const candidatesSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    position: {
      type: String,
      required: [true, "Position is required"],
    },

    number: {
      type: Number,
      required: [true, "Number is required"],
    },

    votes: {
      type: Number,
      default: 0,
    },

    logo: {
      type: String,
      required: [true, "Logo is required"],
      unique: true,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Candidate = mongoose.model("candidate", candidatesSchema);
