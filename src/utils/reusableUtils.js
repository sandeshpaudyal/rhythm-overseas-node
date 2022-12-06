/**
 * Meta data for pagination
 * @param {Number} pageNo
 * @param {Number} limit
 * @param {Object} totalCount
 * @returns {Object}
 */
export async function getMetaDetail(pageNo, limit, totalCount) {
  totalCount = totalCount.count ? totalCount.count : totalCount;
  return {
    current_page: pageNo,
    from: totalCount > 0 ? (pageNo - 1) * limit + 1 : 0,
    last_page: Math.ceil(totalCount / limit),
    per_page: limit,
    to: pageNo * limit > totalCount ? totalCount : pageNo * limit,
    total: totalCount,
  };
}
