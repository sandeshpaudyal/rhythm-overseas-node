import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterCandidates } from "../filter/candidate";
import {
  conflict,
  notFound,
  unprocessableEntity,
} from "../middlewares/errorHandler";
import {
  createCandidate,
  getAllCandidates,
  getAllCandidatesCount,
  getCandidate,
  getCandidatebyField,
  updateCandidate,
} from "../services/candidateService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const candidatesController = {
  /**
   * List of Candidate
   */
  async fetchAll(req, res, next) {
    let query = {};

    let { page: pageNo, limit } = req.query;
    // set default or given casted page No and limit (per page)
    pageNo = pageNo ? Number(pageNo) : 1;
    limit = limit ? Number(limit) : Number(process.env.APP_PER_PAGE);

    const filterBody = await filterCandidates(req.query);

    const totalCount = await getAllCandidatesCount(filterBody);

    // build query for pagination
    query.skip = Number((pageNo - 1) * limit);
    query.limit = Number(limit);

    let meta = await getMetaDetail(pageNo, limit, totalCount);
    getAllCandidates()
      .then((data) => res.json({ data, meta }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_CANDIDATES);
        next(err);
      });
  },

  /**
   * show Candidate
   */
  async show(req, res, next) {
    const candidateId = req.params.id;

    const candidateDetail = await getCandidate(candidateId);

    if (!candidateDetail) {
      logger.error(
        `${customMessages.ERROR_FETCHING_CANDIDATE_ID} ${candidateId}`
      );
      return notFound(req, res, customMessages.NO_CANDIDATE_FOUND);
    }

    return res.json({ data: candidateDetail });
  },

  /**
   * Create new candidate
   */

  async createCandidate(req, res, next) {
    const checkCandidateEmailExists = await getCandidatebyField({
      email: req.body.email,
    });

    if (checkCandidateEmailExists) {
      return conflict(req, res, customMessages.EMAIL_ALREADY_USED);
    }

    const checkCandidatePassportExists = await getCandidatebyField({
      passport_number: req.body.passport_number,
    });

    if (checkCandidatePassportExists) {
      return conflict(req, res, customMessages.EMAIL_ALREADY_USED);
    }

    createCandidate(req.body, req.files)
      .then((data) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_CREATING_CANDIDATE);
        next(err);
      });
  },

  /**
   * Update candidate
   */

  async updateCandidate(req, res, next) {
    const { id } = req.params;
    const checkCandidateExists = await getCandidate(id);

    if (!checkCandidateExists) {
      return notFound(req, res, customMessages.NO_CANDIDATE_FOUND);
    }

    updateCandidate(id, req.body, req.files)
      .then((data) => {
        if (data[0] !== 1) {
          return unprocessableEntity(
            req,
            res,
            customMessages.FAILURE_CANDIDATE_UPDATE
          );
        }
        return res.json({
          data: { message: customMessages.SUCCESS_CANDIDATE_UPDATE },
        });
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_CANDIDATE_UPDATE);
        next(err);
      });
  },
};

module.exports = candidatesController;
