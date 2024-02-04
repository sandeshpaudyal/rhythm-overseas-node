import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterImportantLinks } from "../filter/importantLink";
import { notFound, unprocessableEntity } from "../middlewares/errorHandler";
import {
  createImportantLink,
  deleteImportantLink,
  getAllImportantLinks,
  getAllImportantLinksCount,
  getImportantLink,
  updateImportantLink,
} from "../services/importantLinkService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const importantLinksController = {
  /**
   * List of important link
   */
  async fetchAll(req, res, next) {
    let query = {};

    let { page: pageNo, limit } = req.query;
    // set default or given casted page No and limit (per page)
    pageNo = pageNo ? Number(pageNo) : 1;
    limit = limit ? Number(limit) : Number(process.env.APP_PER_PAGE);

    const filterBody = await filterImportantLinks(req.query);

    const totalCount = await getAllImportantLinksCount(filterBody);

    // build query for pagination
    query.skip = Number((pageNo - 1) * limit);
    query.limit = Number(limit);

    let meta = await getMetaDetail(pageNo, limit, totalCount);

    getAllImportantLinks(filterBody, query)
      .then((data) => res.json({ data, meta }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_IMPORTANT_LINKS);
        next(err);
      });
  },

  /**
   * show important link
   */
  async show(req, res, next) {
    const importantLinkId = req.params.id;

    const importantLinkDetail = await getImportantLink(importantLinkId);

    if (!importantLinkDetail) {
      logger.error(
        `${customMessages.ERROR_FETCHING_IMPORTANT_LINKS_ID} ${importantLinkId}`
      );
      return notFound(req, res, customMessages.NO_IMPORTANT_LINKS_FOUND);
    }

    return res.json({ data: importantLinkDetail });
  },

  /**
   * Create new importantLink
   */

  async createImportantLink(req, res, next) {
    createImportantLink(req.body)
      .then((data) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_CREATING_IMPORTANT_LINKS);
        next(err);
      });
  },

  /**
   * Update importantLink
   */

  async updateImportantLink(req, res, next) {
    const { id } = req.params;
    const checkImportantLinkExists = await getImportantLink(id);

    if (!checkImportantLinkExists) {
      return notFound(req, res, customMessages.NO_IMPORTANT_LINKS_FOUND);
    }

    updateImportantLink(id, req.body)
      .then((data) => {
        if (data[0] !== 1) {
          return unprocessableEntity(
            req,
            res,
            customMessages.FAILURE_IMPORTANT_LINKS_UPDATE
          );
        }
        return res.json({
          data: { message: customMessages.SUCCESS_IMPORTANT_LINKS_UPDATE },
        });
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_IMPORTANT_LINKS_UPDATE);
        next(err);
      });
  },

  /**
   * Delete Important Link
   */
  async deleteImportantLink(req, res, next) {
    const { id } = req.params;
    const checkImportantLinkExists = await getImportantLink(id);

    if (!checkImportantLinkExists) {
      return notFound(req, res, customMessages.NO_IMPORTANT_LINKS_FOUND);
    }

    deleteImportantLink(id)
      .then((data) => {
        return res.status(HttpStatus.NO_CONTENT).json();
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_IMPORTANT_LINKS_DELETE);
        next(err);
      });
  },
};

module.exports = importantLinksController;
