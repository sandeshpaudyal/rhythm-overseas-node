import { Router } from "express";

import * as CandidateController from "../controllers/candidates";
import { validateAuthUser } from "../middlewares/auth";
import {
  candidateInsertValidator,
  candidateUpdateValidator,
} from "../validators/candidateValidator";

const router = Router();

/**
 * GET /api/candidates
 */
router.get("/", validateAuthUser, CandidateController.fetchAll);

/**
 * GET /api/candidates/:id
 */
router.get("/:id", CandidateController.show);

/**
 * POST /api/candidates
 */
router.post(
  "/",
  validateAuthUser,
  candidateInsertValidator,
  CandidateController.createCandidate
);

/**
 * PUT /api/candidates/:id
 */
router.put(
  "/:id",
  validateAuthUser,
  candidateUpdateValidator,
  CandidateController.updateCandidate
);

export default router;
