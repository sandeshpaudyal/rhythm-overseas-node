import { Op } from "sequelize";

/**
 *
 * @param   {Object}  query
 *
 * @returns {Promise}
 */
export function filterFeedbacks(query) {
  let searchParams = {};

  if (query.id) {
    searchParams.id = query.id;
  } else {
    if (query.keyword) {
      searchParams.email = { [Op.like]: `%${query.keyword}%` };
    }
  }

  return searchParams;
}
