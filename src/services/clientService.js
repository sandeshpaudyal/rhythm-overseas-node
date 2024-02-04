import { Client } from "../models";
import logger from "../utils/logger";

/**
 * Get all clients.
 *
 * @returns {Promise}
 */
export async function getAllClients(filterBody, query) {
  return await Client.findAll({
    where: filterBody,
    limit: query.limit,
    offset: query.skip,
  });
}

/**
 * Get a client.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function getClient(id) {
  return await Client.findByPk(id);
}

/**
 * Create a client.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function createClient(body) {
  return await Client.build(body)
    .save()
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new client ", err);
    });
}

/**
 * Update a client.
 *
 * @param   {String}  id
 * @param   {Object}  body
 * @returns {Promise}
 */
export async function updateClient(id, body) {
  return await Client.update(body, {
    where: {
      id,
    },
  })
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new client ", err);
    });
}

/**
 * Get a client by single field.
 *
 * @param   {String}  field
 * @returns {Promise}
 */
export async function getClientbyField(field) {
  return await Client.findOne({
    where: field,
  });
}

/**
 * get total count of available clients
 * @param {Object} filterBody
 * @returns {Promise}
 */
export async function getAllClientsCount(filterBody) {
  return await Client.count({
    where: filterBody,
    distinct: true,
  });
}
