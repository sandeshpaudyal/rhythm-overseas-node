import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterGalleries } from "../filter/gallery";
import { notFound } from "../middlewares/errorHandler";
import {
  addImageToGallery,
  deleteGalleryImage,
  getAllGalleryImages,
  getAllGalleryImagesCount,
  getGalleryImage,
} from "../services/galleryService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const gallerysController = {
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
      filterBody.is_visible = true;
    }

    const totalCount = await getAllGalleryImagesCount(filterBody);

    // build query for pagination
    query.skip = Number((pageNo - 1) * limit);
    query.limit = Number(limit);

    let meta = await getMetaDetail(pageNo, limit, totalCount);

    getAllGalleryImages(filterBody, query)
      .then((data) => res.json({ data, meta }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_IMPORTANT_LINKSS);
        next(err);
      });
  },

  /**
   * show gallery image
   */
  async show(req, res, next) {
    const galleryId = req.params.id;

    const galleryDetail = await getGalleryImage(galleryId);

    if (!galleryDetail) {
      logger.error(
        `${customMessages.ERROR_FETCHING_IMPORTANT_LINKS_ID} ${galleryId}`
      );
      return notFound(req, res, customMessages.NO_IMPORTANT_LINKS_FOUND);
    }

    return res.json({ data: galleryDetail });
  },

  /**
   * Create new gallery
   */

  async addImageToGallery(req, res, next) {
    addImageToGallery(req.body, req.files)
      .then((data) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_CREATING_IMPORTANT_LINKS);
        next(err);
      });
  },

  /**
   * Delete Gallery Image
   */
  async deleteGalleryImage(req, res, next) {
    const { id } = req.params;
    const checkGalleryImageExists = await getGalleryImage(id);

    if (!checkGalleryImageExists) {
      return notFound(req, res, customMessages.NO_IMPORTANT_LINKS_FOUND);
    }

    deleteGalleryImage(id)
      .then((data) => {
        return res.status(HttpStatus.NO_CONTENT).json();
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_IMPORTANT_LINKS_DELETE);
        next(err);
      });
  },
};

module.exports = gallerysController;
