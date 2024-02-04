import { Router } from "express";
import * as FeedbackController from "../controllers/feedbacks";
import { validateAuthUser } from "../middlewares/auth";
import {
  feedbackInsertValidator,
  feedbackUpdateValidator,
} from "../validators/feedbackValidator";

const router = Router();

/**
 * GET /api/feedbacks
 */
router.get("/", validateAuthUser, FeedbackController.fetchAll);

/**
 * GET /api/feedbacks/:id
 */
router.get("/:id", validateAuthUser, FeedbackController.show);

/**
 * POST /api/feedbacks
 */
router.post("/", feedbackInsertValidator, FeedbackController.createFeedback);

/**
 * PUT /api/feedbacks/:id
 */
router.put(
  "/:id",
  validateAuthUser,
  feedbackUpdateValidator,
  FeedbackController.updateFeedback
);

export default router;
