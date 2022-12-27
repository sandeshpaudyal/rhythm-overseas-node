import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterGalleries } from "../filter/gallery";
import { notFound } from "../middlewares/errorHandler";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsCount,
  getBlog,
} from "../services/blogService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const blogsController = {
  /**
   * List of gallery images
   */
  async fetchAll(req, res, next) {
    let query = {};

    let { page: pageNo, limit } = req.query;
    // set default or given casted page No and limit (per page)
    pageNo = pageNo ? Number(pageNo) : 1;
    limit = limit ? Number(limit) : Number(process.env.APP_PER_PAGE);

    const filterBody = await filterGalleries(req.query);

    if (!req.user) {
      filterBody.is_published = true;
    }

    const totalCount = await getAllBlogsCount(filterBody);

    // build query for pagination
    query.skip = Number((pageNo - 1) * limit);
    query.limit = Number(limit);

    let meta = await getMetaDetail(pageNo, limit, totalCount);

    getAllBlogs(filterBody, query)
      .then((data) => res.json({ data, meta }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_BLOGS);
        next(err);
      });
  },

  /**
   * show gallery image
   */
  async show(req, res, next) {
    const galleryId = req.params.id;

    const galleryDetail = await getBlog(galleryId);

    if (!galleryDetail) {
      logger.error(`${customMessages.ERROR_FETCHING_BLOGS_ID} ${galleryId}`);
      return notFound(req, res, customMessages.NO_BLOGS_FOUND);
    }

    return res.json({ data: galleryDetail });
  },

  /**
   * Create new gallery
   */

  async createBlog(req, res, next) {
    createBlog(req.body)
      .then((data) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_CREATING_BLOGS);
        next(err);
      });
  },

  /**
   * Update blog
   */

  async updateBlog(req, res, next) {
    const { id } = req.params;
    const checkBlogExists = await getBlog(id);

    if (!checkBlogExists) {
      return notFound(req, res, customMessages.NO_BLOGS_FOUND);
    }

    updateBlog(id, req.body)
      .then((data) => {
        if (data[0] !== 1) {
          return unprocessableEntity(
            req,
            res,
            customMessages.FAILURE_BLOGS_UPDATE
          );
        }
        return res.json({
          data: { message: customMessages.SUCCESS_BLOGS_UPDATE },
        });
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_BLOGS_UPDATE);
        next(err);
      });
  },

  /**
   * Delete Gallery Image
   */
  async deleteBlog(req, res, next) {
    const { id } = req.params;
    const checkBlogExists = await getBlog(id);

    if (!checkBlogExists) {
      return notFound(req, res, customMessages.NO_BLOGS_FOUND);
    }

    deleteBlog(id)
      .then((data) => {
        return res.status(HttpStatus.NO_CONTENT).json();
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_BLOGS_DELETE);
        next(err);
      });
  },
};

module.exports = blogsController;
