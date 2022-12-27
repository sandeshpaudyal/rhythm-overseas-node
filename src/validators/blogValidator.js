import Joi from "@hapi/joi";

import validate from "../utils/validate";

const createBlogSchema = Joi.object({
  title: Joi.string().label("Title").max(225).required(),
  description: Joi.string().label("Description").required(),
  author: Joi.string().label("Author").required(),
  is_published: Joi.boolean().label("Is Published").optional(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().label("Title").max(225).optional(),
  description: Joi.string().label("Description").optional(),
  author: Joi.string().label("Author").optional(),
  is_published: Joi.boolean().label("Is Published").optional(),
});

/**
 * Validate create blog request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function blogInsertValidator(req, res, next) {
  return validate(req.body, createBlogSchema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update blog request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function blogUpdateValidator(req, res, next) {
  return validate(req.body, updateBlogSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export { blogInsertValidator, blogUpdateValidator };
