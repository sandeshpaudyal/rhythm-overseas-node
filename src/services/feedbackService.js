import { Feedback } from "../models";
import logger from "../utils/logger";

/**
 * Get all feedbacks.
 *
 * @returns {Promise}
 */
export async function getAllFeedbacks(filterBody, query) {
  return await Feedback.findAll({
    where: filterBody,
    limit: query.limit,
    offset: query.skip,
  });
}

/**
 * Get a feedback.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function getFeedback(id) {
  return await Feedback.findByPk(id);
}

/**
 * Create a feedback.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function createFeedback(body) {
  return await Feedback.build(body)
    .save()
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new feedback ", err);
    });
}

/**
 * Update a feedback.
 *
 * @param   {String}  id
 * @param   {Object}  body
 * @returns {Promise}
 */
export async function updateFeedback(id, body) {
  return await Feedback.update(body, {
    where: {
      id,
    },
  })
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new feedback ", err);
    });
}

/**
 * Get a feedback by single field.
 *
 * @param   {String}  field
 * @returns {Promise}
 */
export async function getFeedbackbyField(field) {
  return await Feedback.findOne({
    where: field,
  });
}

/**
 * get total count of available feedbacks
 * @param {Object} filterBody
 * @returns {Promise}
 */
export async function getAllFeedbacksCount(filterBody) {
  return await Feedback.count({
    where: filterBody,
    distinct: true,
  });
}
