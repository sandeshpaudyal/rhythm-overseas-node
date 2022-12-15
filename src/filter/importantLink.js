import { Op } from "sequelize";

/**
 *
 * @param   {Object}  query
 *
 * @returns {Promise}
 */
export function filterImportantLinks(query) {
  let searchParams = {};

  if (query.id) {
    searchParams.id = query.id;
  } else {
    if (query.keyword) {
      searchParams.name = { [Op.like]: `%${query.keyword}%` };
    }
  }

  return searchParams;
}
