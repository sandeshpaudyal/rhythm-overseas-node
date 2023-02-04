import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterBlogs } from "../filter/blog";
import { notFound } from "../middlewares/errorHandler";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsCount,
  getBlog,
  updateBlog,
} from "../services/blogService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const blogsController = {
  /**
   * List of blog
   */
  async fetchAll(req, res, next) {
    let query = {};

    let { page: pageNo, limit } = req.query;
    // set default or given casted page No and limit (per page)
    pageNo = pageNo ? Number(pageNo) : 1;
    limit = limit ? Number(limit) : Number(process.env.APP_PER_PAGE);

    const filterBody = await filterBlogs(req.query);

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
   * show blog
   */
  async show(req, res, next) {
    const blogId = req.params.id;

    const blogDetail = await getBlog(blogId);

    if (!blogDetail) {
      logger.error(`${customMessages.ERROR_FETCHING_BLOGS_ID} ${blogId}`);
      return notFound(req, res, customMessages.NO_BLOGS_FOUND);
    }

    return res.json({ data: blogDetail });
  },

  /**
   * Create new blog
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
   * Delete Blog
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
