import { Router } from "express";

import * as BlogController from "../controllers/blogs";
import { validateAuthUser } from "../middlewares/auth";
import {
  blogInsertValidator,
  blogUpdateValidator,
} from "../validators/blogValidator";

const router = Router();

/**
 * GET /api/blogs
 */
router.get("/", validateAuthUser, BlogController.fetchAll);

/**
 * GET /api/blogs/paginate
 */
router.get("/list", BlogController.list);

/**
 * GET /api/blogs/:id
 */
router.get("/:id", BlogController.show);

/**
 * POST /api/blogs
 */
router.post(
  "/",
  validateAuthUser,
  blogInsertValidator,
  BlogController.createBlog
);

/**
 * PUT /api/blogs/:id
 */
router.put(
  "/:id",
  validateAuthUser,
  blogUpdateValidator,
  BlogController.updateBlog
);

/**
 * DELETE /api/blogs/:id
 */
router.delete("/:id", validateAuthUser, BlogController.deleteBlog);

export default router;
