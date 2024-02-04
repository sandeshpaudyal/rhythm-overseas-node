import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterFeedbacks } from "../filter/feedback";
import { notFound, unprocessableEntity } from "../middlewares/errorHandler";
import {
  createFeedback,
  getAllFeedbacks,
  getAllFeedbacksCount,
  getFeedback,
  updateFeedback,
} from "../services/feedbackService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const feedbacksController = {
  /**
   * List of Feedback
   */
  async fetchAll(req, res, next) {
    let query = {};

    let { page: pageNo, limit } = req.query;
    // set default or given casted page No and limit (per page)
    pageNo = pageNo ? Number(pageNo) : 1;
    limit = limit ? Number(limit) : Number(process.env.APP_PER_PAGE);

    const filterBody = await filterFeedbacks(req.query);

    const totalCount = await getAllFeedbacksCount(filterBody);

    // build query for pagination
    query.skip = Number((pageNo - 1) * limit);
    query.limit = Number(limit);

    let meta = await getMetaDetail(pageNo, limit, totalCount);

    getAllFeedbacks(filterBody, query)
      .then((data) => res.json({ data, meta }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_FEEDBACKS);
        next(err);
      });
  },

  /**
   * show Feedback
   */
  async show(req, res, next) {
    const feedbackId = req.params.id;

    const feedbackDetail = await getFeedback(feedbackId);

    if (!feedbackDetail) {
      logger.error(
        `${customMessages.ERROR_FETCHING_FEEDBACK_ID} ${feedbackId}`
      );
      return notFound(req, res, customMessages.NO_FEEDBACK_FOUND);
    }

    return res.json({ data: feedbackDetail });
  },

  /**
   * Create new feedback
   */

  async createFeedback(req, res, next) {
    createFeedback(req.body)
      .then((data) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_CREATING_FEEDBACK);
        next(err);
      });
  },

  /**
   * Update feedback
   */

  async updateFeedback(req, res, next) {
    const { id } = req.params;
    const checkFeedbackExists = await getFeedback(id);

    if (!checkFeedbackExists) {
      return notFound(req, res, customMessages.NO_FEEDBACK_FOUND);
    }

    updateFeedback(id, req.body)
      .then((data) => {
        if (data[0] !== 1) {
          return unprocessableEntity(
            req,
            res,
            customMessages.FAILURE_FEEDBACK_UPDATE
          );
        }
        return res.json({
          data: { message: customMessages.SUCCESS_FEEDBACK_UPDATE },
        });
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_FEEDBACK_UPDATE);
        next(err);
      });
  },
};

module.exports = feedbacksController;
