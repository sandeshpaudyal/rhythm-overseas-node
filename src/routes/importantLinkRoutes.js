import { Router } from "express";

import * as ImportantLinkController from "../controllers/importantLinks";
import { validateAuthUser } from "../middlewares/auth";
import {
  importantLinkInsertValidator,
  importantLinkUpdateValidator,
} from "../validators/importantLinkValidator";

const router = Router();

/**
 * GET /api/importantLinks
 */
router.get("/", ImportantLinkController.fetchAll);

/**
 * GET /api/importantLinks/:id
 */
router.get("/:id", ImportantLinkController.show);

/**
 * POST /api/importantLinks
 */
router.post(
  "/",
  validateAuthUser,
  importantLinkInsertValidator,
  ImportantLinkController.createImportantLink
);

/**
 * PUT /api/importantLinks/:id
 */
router.put(
  "/:id",
  validateAuthUser,
  importantLinkUpdateValidator,
  ImportantLinkController.updateImportantLink
);

/**
 * DELETE /api/importantLinks/:id
 */
router.delete(
  "/:id",
  validateAuthUser,
  ImportantLinkController.deleteImportantLink
);

export default router;
