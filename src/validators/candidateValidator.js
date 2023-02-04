import Joi from "@hapi/joi";

import validate from "../utils/validate";

const createCandidateSchema = Joi.object({
  name: Joi.string().label("Name").max(225).required(),
  contact: Joi.string().label("Contact Number").max(20).required(),
  dob: Joi.date().label("Date of Birth").required(),
  passport_number: Joi.string().label("Passport Number").max(20).required(),
  province: Joi.string().label("Provice / State").required(),
  district: Joi.string().label("District").required(),
  city: Joi.string().label("City").required(),
  emergency_contact_name: Joi.string()
    .label("Emergency Contact Name")
    .optional(),
  emergency_contact_number: Joi.string()
    .label("Emergency Contact Number")
    .optional(),
  secondary_contact_number: Joi.string()
    .label("Secondary Contact Number")
    .allow("", null)
    .optional(),
  other_country: Joi.string().label("Other Country").allow("", null).optional(),
  other_job_willing: Joi.string()
    .label("Other Job Willing")
    .allow("", null)
    .optional(),
  other_previous_experience: Joi.string()
    .label("Other Previous Experience")
    .allow("", null)
    .optional(),
  emergency_contact_relation: Joi.string()
    .label("Emergency Contact Relation")
    .optional(),
  email: Joi.string().label("Email").allow("", null).optional(),
  job_description: Joi.string().label("Job Description").required(),
  country_willing: Joi.string().label("Country Willing").required(),
  previous_experience: Joi.string()
    .label("Previous Experiences")
    .allow("", null)
    .optional(),
  pp_size_photo: Joi.any().label("Passport Size Image").optional(),
  full_size_photo: Joi.any().label("Full Size Image").optional(),
  passport_front: Joi.any().label("Passport Front").optional(),
  passport_back: Joi.any().label("Passport Back").optional(),
  cv: Joi.any().label("CV").optional(),
});

const updateCandidateSchema = Joi.object({
  name: Joi.string().label("Name").max(225).optional(),
  contact: Joi.string().label("Contact Number").max(20).optional(),
  dob: Joi.date().label("Date of Birth").optional(),
  passport_number: Joi.string().label("Passport Number").max(20).optional(),
  province: Joi.string().label("Provice / State").optional(),
  district: Joi.string().label("District").optional(),
  city: Joi.string().label("City").optional(),
  emergency_contact_name: Joi.string()
    .label("Emergency Contact Name")
    .optional(),
  emergency_contact_number: Joi.string()
    .label("Emergency Contact Number")
    .optional(),
  emergency_contact_relation: Joi.string()
    .label("Emergency Contact Relation")
    .optional(),
  secondary_contact_number: Joi.string()
    .label("Secondary Contact Number")
    .allow("", null)
    .optional(),
  other_country: Joi.string().label("Other Country").allow("", null).optional(),
  other_job_willing: Joi.string()
    .label("Other Job Willing")
    .allow("", null)
    .optional(),
  other_previous_experience: Joi.string()
    .label("Other Previous Experience")
    .allow("", null)
    .optional(),
  email: Joi.string().label("Email").optional(),
  job_description: Joi.string().label("Job Description").optional(),
  country_willing: Joi.string().label("Country Willing").optional(),
  previous_experience: Joi.string().label("Previous Experiences").optional(),
  pp_size_photo: Joi.any().label("Passport Size Image").optional(),
  full_size_photo: Joi.any().label("Full Size Image").optional(),
  passport_front: Joi.any().label("Passport Front").optional(),
  passport_back: Joi.any().label("Passport Back").optional(),
  cv: Joi.any().label("CV").optional(),
});

/**
 * Validate create candidate request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function candidateInsertValidator(req, res, next) {
  return validate(req.body, createCandidateSchema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate update candidate request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function candidateUpdateValidator(req, res, next) {
  return validate(req.body, updateCandidateSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export { candidateInsertValidator, candidateUpdateValidator };
