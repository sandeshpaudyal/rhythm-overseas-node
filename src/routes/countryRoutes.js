import { Router } from "express";

import * as CountriesController from "../controllers/countries";

const router = Router();

/**
 * GET /api/sectors/paginate
 */
router.get("/list", CountriesController.list);

export default router;
