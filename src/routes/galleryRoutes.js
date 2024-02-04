import { Router } from "express";

import * as GalleryController from "../controllers/galleries";
import { validateAuthUser } from "../middlewares/auth";

const router = Router();

/**
 * GET /api/galleries
 */
router.get("/", validateAuthUser, GalleryController.fetchAll);

/**
 * GET /api/galleries/paginate
 */
router.get("/paginate", GalleryController.fetchAll);

/**
 * GET /api/galleries/:id
 */
router.get("/:id", GalleryController.show);

/**
 * POST /api/galleries
 */
router.post("/", validateAuthUser, GalleryController.addImageToGallery);

/**
 * PUT /api/galleries/:id
 */
router.put("/:id", validateAuthUser, GalleryController.updateImageDetails);

/**
 * DELETE /api/galleries/:id
 */
router.delete("/:id", validateAuthUser, GalleryController.deleteGalleryImage);

export default router;
