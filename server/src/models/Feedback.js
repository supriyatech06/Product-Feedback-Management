import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    summary: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["UI", "UX", "Enhancement", "Bug", "Feature"],
      default: "Feature"
    },
    status: {
      type: String,
      enum: ["Open", "Planned", "In Progress", "Released"],
      default: "Open"
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },
    votes: {
      type: Number,
      default: 0,
      min: 0
    },
    authorName: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    comments: {
      type: [commentSchema],
      default: []
    }
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);

