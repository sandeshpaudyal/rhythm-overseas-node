import { Country } from "../models";

/**
 * Get all countries.
 *
 * @returns {Promise}
 */
export async function getAllCountries(filterBody, query) {
  let orderBy = [["order_by", "ASC"]];
  if (query?.limit) {
    orderBy = [["order_by", "DESC"]];
  }
  return await Country.findAll({
    where: filterBody ? filterBody : {},
    limit: query?.limit,
    offset: query?.skip,
    order: orderBy,
  });
}
