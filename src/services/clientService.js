import { Client } from "../models";
import logger from "../utils/logger";

/**
 * Get all clients.
 *
 * @returns {Promise}
 */
export function getAllClients() {
  return Client.findAll();
}

/**
 * Get a client.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export function getClient(id) {
  return Client.findByPk(id);
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
export function getClientbyField(field) {
  return Client.findOne({
    where: field,
  });
}
