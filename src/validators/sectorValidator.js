import Joi from "@hapi/joi";

import validate from "../utils/validate";

const createSectorSchema = Joi.object({
  name: Joi.string().label("Name").max(225).required(),
  status: Joi.boolean().label("Status").optional(),
});

const updateSectorSchema = Joi.object({
  name: Joi.string().label("Name").max(225).optional(),
  status: Joi.boolean().label("Status").optional(),
});

/**
 * Validate create sector request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function sectorInsertValidator(req, res, next) {
  return validate(req.body, createSectorSchema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update sector request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function sectorUpdateValidator(req, res, next) {
  return validate(req.body, updateSectorSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export { sectorInsertValidator, sectorUpdateValidator };
