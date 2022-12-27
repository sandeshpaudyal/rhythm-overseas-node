import { Gallery } from "../models";
import logger from "../utils/logger";

/**
 * Get all images.
 *
 * @returns {Promise}
 */
export async function getAllGalleryImages(filterBody, query) {
  return await Gallery.findAll({
    where: filterBody,
    limit: query.limit,
    offset: query.skip,
  });
}

/**
 * Get a image.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function getGalleryImage(id) {
  return await Gallery.findByPk(id);
}

/**
 * Create a image.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function addImageToGallery(body, uploads) {
  const insertBody = {
    title: body.title,
    is_visible: body.visibility ? body.visibility : false,
  };

  let imageDetail = uploads.filter((file) => file.fieldname === "image");
  if (imageDetail) {
    insertBody.image = imageDetail[0]["path"];
  }
  return await Gallery.build(insertBody)
    .save()
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on adding new image ", err);
    });
}

/**
 * Delete a image.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export async function deleteGalleryImage(id) {
  return await Gallery.destroy({
    where: {
      id,
    },
  });
}

/**
 * get total count of available images
 * @param {Object} filterBody
 * @returns {Promise}
 */
export async function getAllGalleryImagesCount(filterBody) {
  return await Gallery.count({
    where: filterBody,
    distinct: true,
  });
}
