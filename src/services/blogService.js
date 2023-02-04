import { Blog } from "../models";
import logger from "../utils/logger";

/**
 * Get all blogs.
 *
 * @returns {Promise}
 */
export async function getAllBlogs(filterBody, query) {
  return await Blog.findAll({
    where: filterBody,
    limit: query.limit,
    offset: query.skip,
  });
}

/**
 * Get a blog.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function getBlog(id) {
  return await Blog.findByPk(id);
}

/**
 * Create a blog.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function createBlog(body, uploads) {
  let coverImage = uploads.filter((file) => file.fieldname === "cover_image");
  if (coverImage.length > 0) {
    body.cover_image = coverImage[0]["path"];
  }
  return await Blog.build(body)
    .save()
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on adding new blog ", err);
    });
}

/**
 * Update a blog.
 *
 * @param   {String}  id
 * @param   {Object}  body
 * @returns {Promise}
 */
export async function updateBlog(id, body) {
  return await Blog.update(body, {
    where: {
      id,
    },
  })
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new blog ", err);
    });
}

/**
 * Delete a blog.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function deleteBlog(id) {
  return await Blog.destroy({
    where: {
      id,
    },
  });
}

/**
 * get total count of available blogs
 * @param {Object} filterBody
 * @returns {Promise}
 */
export async function getAllBlogsCount(filterBody) {
  return await Blog.count({
    where: filterBody,
    distinct: true,
  });
}
