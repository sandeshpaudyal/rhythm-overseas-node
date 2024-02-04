import { Router } from "express";

import * as SectorController from "../controllers/sectors";
import { validateAuthUser } from "../middlewares/auth";
import {
  sectorInsertValidator,
  sectorUpdateValidator,
} from "../validators/sectorValidator";

const router = Router();

/**
 * GET /api/sectors
 */
router.get("/", validateAuthUser, SectorController.fetchAll);

/**
 * GET /api/sectors/paginate
 */
router.get("/list", SectorController.list);

/**
 * GET /api/sectors/:id
 */
router.get("/:id", SectorController.show);

/**
 * POST /api/sectors
 */
router.post(
  "/",
  validateAuthUser,
  sectorInsertValidator,
  SectorController.createSector
);

/**
 * PUT /api/sectors/:id
 */
router.put(
  "/:id",
  validateAuthUser,
  sectorUpdateValidator,
  SectorController.updateSector
);

/**
 * DELETE /api/sectors/:id
 */
router.delete("/:id", validateAuthUser, SectorController.deleteSector);

export default router;
