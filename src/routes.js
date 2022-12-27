import { Router } from "express";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import importantLinkRoutes from "./routes/importantLinkRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import blogRoutes from "./routes/blogRoutes";

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get("/", (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});

/**
 * GET /api/health
 */
router.get("/health-check", (req, res) => {
  const healthcheck = {
    message: "OK",
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/clients", clientRoutes);
router.use("/candidates", candidateRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/important-links", importantLinkRoutes);
router.use("/galleries", galleryRoutes);
router.use("/blogs", blogRoutes);

export default router;
