import { Router } from "express";

import * as ClientController from "../controllers/clients";
import { validateAuthUser } from "../middlewares/auth";
import {
  clientInsertValidator,
  clientUpdateValidator,
} from "../validators/clientValidator";

const router = Router();

/**
 * GET /api/clients
 */
router.get("/", validateAuthUser, ClientController.fetchAll);

/**
 * GET /api/clients/:id
 */
router.get("/:id", ClientController.show);

/**
 * POST /api/clients
 */
router.post(
  "/",
  validateAuthUser,
  clientInsertValidator,
  ClientController.createClient
);

/**
 * PUT /api/clients/:id
 */
router.put(
  "/:id",
  validateAuthUser,
  clientUpdateValidator,
  ClientController.updateClient
);

export default router;
