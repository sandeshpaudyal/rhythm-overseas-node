import Joi from "@hapi/joi";

import validate from "../utils/validate";

const createFeedbackSchema = Joi.object({
  name: Joi.string().label("Name").max(225).required(),
  email: Joi.string().label("Email").required(),
  message: Joi.string().label("Message").required(),
  reply: Joi.string().label("Reply").optional(),
  is_replied: Joi.boolean().label("Is Replied").optional(),
});

const updateFeedbackSchema = Joi.object({
  name: Joi.string().label("Name").max(225).optional(),
  email: Joi.string().label("Email").optional(),
  message: Joi.string().label("Message").optional(),
  reply: Joi.string().label("Reply").optional(),
  is_replied: Joi.boolean().label("Is Replied").optional(),
});

/**
 * Validate create feedback request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function feedbackInsertValidator(req, res, next) {
  return validate(req.body, createFeedbackSchema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update feedback request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function feedbackUpdateValidator(req, res, next) {
  return validate(req.body, updateFeedbackSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export { feedbackInsertValidator, feedbackUpdateValidator };
