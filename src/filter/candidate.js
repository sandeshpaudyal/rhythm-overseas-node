import { Op } from "sequelize";

/**
 *
 * @param   {Object}  query
 *
 * @returns {Promise}
 */
export function filterCandidates(query) {
  let searchParams = {};

  if (query.id) {
    searchParams.id = query.id;
  } else {
    if (query.keyword) {
      searchParams[Op.or] = {
        name: { [Op.like]: `%${query.keyword}%` },
        email: { [Op.like]: `%${query.keyword}%` },
        passport_number: query.keyword,
        phone_number: query.keyword,
      };
    }
  }

  return searchParams;
}
