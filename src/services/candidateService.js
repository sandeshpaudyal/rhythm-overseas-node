import { Candidate } from "../models";
import logger from "../utils/logger";

/**
 * Get all candidates.
 *
 * @returns {Promise}
 */
export function getAllCandidates() {
  return Candidate.findAll();
}

/**
 * Get a candidate.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export function getCandidate(id) {
  return Candidate.findByPk(id);
}

/**
 * Create a candidate.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function createCandidate(body, uploads) {
  let ppSizePhoto = uploads.filter(
    (file) => file.fieldname === "pp_size_photo"
  );
  if (ppSizePhoto) {
    body.pp_size_photo = ppSizePhoto[0]["path"];
  }

  let fullSizePhoto = uploads.filter(
    (file) => file.fieldname === "full_size_photo"
  );
  if (fullSizePhoto) {
    body.full_size_photo = fullSizePhoto[0]["path"];
  }

  let passportFront = uploads.filter(
    (file) => file.fieldname === "passport_front"
  );
  if (passportFront) {
    body.passport_front = passportFront[0]["path"];
  }

  let passportBack = uploads.filter(
    (file) => file.fieldname === "passport_back"
  );
  if (passportBack) {
    body.passport_back = passportBack[0]["path"];
  }

  let cv = uploads.filter((file) => file.fieldname === "cv");
  if (cv) {
    body.cv = cv[0]["path"];
  }

  return await Candidate.build(body)
    .save()
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new candidate ", err);
    });
}

/**
 * Update a candidate.
 *
 * @param   {String}  id
 * @param   {Object}  body
 * @returns {Promise}
 */
export async function updateCandidate(id, body, uploads) {
  let ppSizePhoto = uploads.filter(
    (file) => file.fieldname === "pp_size_photo"
  );
  if (ppSizePhoto) {
    body.pp_size_photo = ppSizePhoto[0]["path"];
  }

  let fullSizePhoto = uploads.filter(
    (file) => file.fieldname === "full_size_photo"
  );
  if (fullSizePhoto) {
    body.full_size_photo = fullSizePhoto[0]["path"];
  }

  let passportFront = uploads.filter(
    (file) => file.fieldname === "passport_front"
  );
  if (passportFront) {
    body.passport_front = passportFront[0]["path"];
  }

  let passportBack = uploads.filter(
    (file) => file.fieldname === "passport_back"
  );
  if (passportBack) {
    body.passport_back = passportBack[0]["path"];
  }

  let cv = uploads.filter((file) => file.fieldname === "cv");
  if (cv) {
    body.cv = cv[0]["path"];
  }

  return await Candidate.update(body, {
    where: {
      id,
    },
  })
    .then((data) => data)
    .catch((err) => {
      logger.error("Error on creating new candidate ", err);
    });
}

/**
 * Get a candidate by single field.
 *
 * @param   {String}  field
 * @returns {Promise}
 */
export function getCandidatebyField(field) {
  return Candidate.findOne({
    where: field,
  });
}
