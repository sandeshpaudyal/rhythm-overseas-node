import Joi from "@hapi/joi";

import validate from "../utils/validate";

const validUrl =
  /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const createImportantLinkSchema = Joi.object({
  name: Joi.string().label("Name").max(225).required(),
  link: Joi.string().regex(validUrl).label("Video URL").required().messages({
    "string.pattern.base": `Invalid url, should be either http(s)://domain.com/`,
  }),
});

const updateImportantLinkSchema = Joi.object({
  name: Joi.string().label("Name").max(225).required(),
  link: Joi.string().regex(validUrl).label("Video URL").required().messages({
    "string.pattern.base": `Invalid url, should be either http(s)://domain.com/`,
  }),
});

/**
 * Validate create important link request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function importantLinkInsertValidator(req, res, next) {
  return validate(req.body, createImportantLinkSchema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update importantLink request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function importantLinkUpdateValidator(req, res, next) {
  return validate(req.body, updateImportantLinkSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export { importantLinkInsertValidator, importantLinkUpdateValidator };
