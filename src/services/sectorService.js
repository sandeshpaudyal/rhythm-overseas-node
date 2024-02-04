import { Sector } from "../models";
import logger from "../utils/logger";

/**
 * Get all sectors.
 *
 * @returns {Promise}
 */
export async function getAllSectors(filterBody, query) {
  let orderBy = [["order_by", "ASC"]];
  if (query?.limit) {
    orderBy = [["order_by", "DESC"]];
  }
  return await Sector.findAll({
    where: filterBody,
    limit: query?.limit,
    offset: query?.skip,
    order: orderBy,
  });
}

/**
 * Get a sector.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function getSector(id) {
  return await Sector.findByPk(id);
}

/**
 * Create a sector.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function createSector(body) {
  return await Sector.build(body)
    .save()
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on adding new sector ", err);
    });
}

/**
 * Update a sector.
 *
 * @param   {String}  id
 * @param   {Object}  body
 * @returns {Promise}
 */
export async function updateSector(id, body) {
  return await Sector.update(body, {
    where: {
      id,
    },
  })
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new sector ", err);
    });
}

/**
 * Delete a sector.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function deleteSector(id) {
  return await Sector.destroy({
    where: {
      id,
    },
  });
}

/**
 * get total count of available sectors
 * @param {Object} filterBody
 * @returns {Promise}
 */
export async function getAllSectorsCount(filterBody) {
  return await Sector.count({
    where: filterBody,
    distinct: true,
  });
}
