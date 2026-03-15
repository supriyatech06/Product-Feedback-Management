import { Router } from "express";
import {
  addCommentToFeedback,
  createFeedback,
  getFeedbackList,
  getFeedbackSummary,
  updateFeedbackStatus
} from "../controllers/feedbackController.js";

const router = Router();

router.get("/", getFeedbackList);
router.get("/summary", getFeedbackSummary);
router.post("/", createFeedback);
router.patch("/:id/status", updateFeedbackStatus);
router.post("/:id/comments", addCommentToFeedback);

export default router;

