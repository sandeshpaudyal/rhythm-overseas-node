import { Op } from "sequelize";

/**
 *
 * @param   {Object}  query
 *
 * @returns {Promise}
 */
export function filterBlogs(query) {
  let searchParams = {};

  if (query.id) {
    searchParams.id = query.id;
  } else {
    if (query.keyword) {
      searchParams.title = { [Op.like]: `%${query.keyword}%` };
    }
  }

  return searchParams;
}
