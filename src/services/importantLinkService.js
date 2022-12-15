import { ImportantLink } from "../models";
import logger from "../utils/logger";

/**
 * Get all important links.
 *
 * @returns {Promise}
 */
export async function getAllImportantLinks(filterBody, query) {
  return await ImportantLink.findAll({
    where: filterBody,
    limit: query.limit,
    offset: query.skip,
  });
}

/**
 * Get a important link.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function getImportantLink(id) {
  return await ImportantLink.findByPk(id);
}

/**
 * Create a important link.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function createImportantLink(body) {
  return await ImportantLink.build(body)
    .save()
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new important link ", err);
    });
}

/**
 * Update a important link.
 *
 * @param   {String}  id
 * @param   {Object}  body
 * @returns {Promise}
 */
export async function updateImportantLink(id, body) {
  return await ImportantLink.update(body, {
    where: {
      id,
    },
  })
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new important link ", err);
    });
}

/**
 * Get a important link by single field.
 *
 * @param   {String}  field
 * @returns {Promise}
 */
export async function getImportantLinkbyField(field) {
  return await ImportantLink.findOne({
    where: field,
  });
}

/**
 * get total count of available important links
 * @param {Object} filterBody
 * @returns {Promise}
 */
export async function getAllImportantLinksCount() {
  return await ImportantLink.count({
    distinct: true,
  });
}
