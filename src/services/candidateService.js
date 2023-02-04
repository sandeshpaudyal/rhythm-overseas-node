import {
  Candidate,
  CandidateJobWilling,
  CandidateCountriesWilling,
  CandidatePreviousExperience,
  Sector,
  Country,
} from "../models";
import logger from "../utils/logger";

// includes models
const includes = [
  {
    model: CandidateJobWilling,
    as: "job_willings",
    include: {
      model: Sector,
      as: "sector",
    },
  },
  {
    model: CandidateCountriesWilling,
    as: "countries_willings",
    include: {
      model: Country,
      as: "country",
    },
  },
  {
    model: CandidatePreviousExperience,
    as: "previous_experiences",
    include: {
      model: Sector,
      as: "sector",
    },
  },
];

/**
 * Get all candidates.
 *
 * @returns {Promise}
 */
export function getAllCandidates() {
  return Candidate.findAll({ include: includes });
}

/**
 * Get a candidate.
 *
 * @param   {String}  id
 * @returns {Promise}
 */
export function getCandidate(id) {
  return Candidate.findByPk(id, {
    include: includes,
  });
}

/**
 * Create a candidate.
 *
 * @param   {Object}  body
 * @returns {Promise}
 */

export async function createCandidate(body, uploads) {
  let countryWilling = [];
  let jobWilling = [];
  let previousExperience = [];

  let ppSizePhoto = uploads.filter(
    (file) => file.fieldname === "pp_size_photo"
  );
  if (ppSizePhoto.length > 0) {
    body.pp_size_photo = ppSizePhoto[0]["path"];
  }

  let fullSizePhoto = uploads.filter(
    (file) => file.fieldname === "full_size_photo"
  );
  if (fullSizePhoto.length > 0) {
    body.full_size_photo = fullSizePhoto[0]["path"];
  }

  let passportFront = uploads.filter(
    (file) => file.fieldname === "passport_front"
  );
  if (passportFront.length > 0) {
    body.passport_front = passportFront[0]["path"];
  }

  let passportBack = uploads.filter(
    (file) => file.fieldname === "passport_back"
  );
  if (passportBack.length > 0) {
    body.passport_back = passportBack[0]["path"];
  }

  let cv = uploads.filter((file) => file.fieldname === "cv");
  if (cv.length > 0) {
    body.cv = cv[0]["path"];
  }

  // store willing countries
  if (body?.country_willing) {
    countryWilling = body.country_willing;
    delete body.country_willing;
  }

  // store willing jobs
  if (body?.job_description) {
    jobWilling = body.job_description;
    delete body.job_description;
  }

  // store previous experiences
  if (body?.previous_experience) {
    previousExperience = body.previous_experience;
    delete body.previous_experience;
  }

  const candidateDetail = await Candidate.build(body).save();

  if (jobWilling.length > 0) {
    jobWilling = jobWilling.map((x) => {
      return { sector_id: x, candidate_id: candidateDetail.id };
    });
    await CandidateJobWilling.bulkCreate(jobWilling);
  }

  if (countryWilling.length > 0) {
    countryWilling = countryWilling.map((x) => {
      return { country_id: x, candidate_id: candidateDetail.id };
    });
    await CandidateCountriesWilling.bulkCreate(countryWilling);
  }

  if (previousExperience.length > 0) {
    previousExperience = previousExperience.map((x) => {
      return { sector_id: x, candidate_id: candidateDetail.id };
    });

    await CandidatePreviousExperience.bulkCreate(previousExperience);
  }

  return getCandidate(candidateDetail.id);
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

/**
 * get total count of available candidates
 * @param {Object} filterBody
 * @returns {Promise}
 */
export async function getAllCandidatesCount(filterBody) {
  return Candidate.count({
    where: filterBody,
    distinct: true,
  });
}
