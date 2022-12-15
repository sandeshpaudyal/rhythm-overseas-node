import { Op } from "sequelize";

/**
 *
 * @param   {Object}  query
 *
 * @returns {Promise}
 */
export function filterClients(query) {
  let searchParams = {};

  if (query.id) {
    searchParams.id = query.id;
  } else {
    if (query.keyword) {
      searchParams[Op.or] = {
        office_number: query.keyword,
        phone_number: query.keyword,
        company_name: { [Op.like]: `%${query.keyword}%` },
        representative_name: { [Op.like]: `%${query.keyword}%` },
        email: { [Op.like]: `%${query.keyword}%` },
      };
    }
  }

  return searchParams;
}
