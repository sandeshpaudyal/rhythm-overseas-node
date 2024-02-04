import Joi from "@hapi/joi";

import validate from "../utils/validate";

const createClientSchema = Joi.object({
  company_name: Joi.string().label("Company Name").max(225).required(),
  url: Joi.string().label("Company Url").optional(),
  office_number: Joi.string().label("Office Phone").max(20).required(),
  country: Joi.string().label("Country").required(),
  state: Joi.string().label("State").required(),
  city: Joi.string().label("City").required(),
  representative_name: Joi.string().label("Representative Name").required(),
  email: Joi.string().label("Email").required(),
  contact_number: Joi.string().label("Contact Number").max(20).required(),
  alternate_number: Joi.string().label("Alternative Number").max(20).optional(),
  looking_for: Joi.string().label("Looking For").required(),
  status: Joi.boolean().label("Status").optional(),
  designation: Joi.string().label("Designation").required(),
});

const updateClientSchema = Joi.object({
  company_name: Joi.string().label("Company Name").max(225).required(),
  url: Joi.string().label("Company Url").optional(),
  office_number: Joi.string().label("Office Phone").max(20).required(),
  country: Joi.string().label("Country").required(),
  state: Joi.string().label("State").required(),
  city: Joi.string().label("City").required(),
  representative_name: Joi.string().label("Representative Name").required(),
  email: Joi.string().label("Email").required(),
  contact_number: Joi.string().label("Contact Number").max(20).required(),
  alternate_number: Joi.string().label("Alternative Number").max(20).optional(),
  looking_for: Joi.string().label("Looking For").required(),
  designation: Joi.string().label("Designation").required(),
  status: Joi.boolean().label("Status").optional(),
});

/**
 * Validate create client request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function clientInsertValidator(req, res, next) {
  return validate(req.body, createClientSchema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update client request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function clientUpdateValidator(req, res, next) {
  return validate(req.body, updateClientSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export { clientInsertValidator, clientUpdateValidator };
