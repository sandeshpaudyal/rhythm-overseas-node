import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterSectors } from "../filter/sector";
import { notFound } from "../middlewares/errorHandler";
import {
  createSector,
  deleteSector,
  getAllSectors,
  getAllSectorsCount,
  getSector,
  updateSector,
} from "../services/sectorService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const sectorsController = {
  /**
   * Paginated list of sectors
   */
  async fetchAll(req, res, next) {
    let query = {};

    let { page: pageNo, limit } = req.query;
    // set default or given casted page No and limit (per page)
    pageNo = pageNo ? Number(pageNo) : 1;
    limit = limit ? Number(limit) : Number(process.env.APP_PER_PAGE);

    const filterBody = await filterSectors(req.query);

    if (!req.user) {
      filterBody.is_published = true;
    }

    const totalCount = await getAllSectorsCount(filterBody);

    // build query for pagination
    query.skip = Number((pageNo - 1) * limit);
    query.limit = Number(limit);

    let meta = await getMetaDetail(pageNo, limit, totalCount);

    getAllSectors(filterBody, query)
      .then((data) => res.json({ data, meta }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_SECTORS);
        next(err);
      });
  },

  /**
   * List of sectors
   */
  async list(req, res, next) {
    const filterBody = await filterSectors(req.query);

    if (!req.user) {
      filterBody.status = true;
    }

    getAllSectors(filterBody)
      .then((data) => res.json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_SECTORS);
        next(err);
      });
  },

  /**
   * show sector
   */
  async show(req, res, next) {
    const sectorId = req.params.id;

    const sectorDetail = await getSector(sectorId);

    if (!sectorDetail) {
      logger.error(`${customMessages.ERROR_FETCHING_SECTORS_ID} ${sectorId}`);
      return notFound(req, res, customMessages.NO_SECTORS_FOUND);
    }

    return res.json({ data: sectorDetail });
  },

  /**
   * Create new sector
   */

  async createSector(req, res, next) {
    createSector(req.body)
      .then((data) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_CREATING_SECTORS);
        next(err);
      });
  },

  /**
   * Update sector
   */

  async updateSector(req, res, next) {
    const { id } = req.params;
    const checkSectorExists = await getSector(id);

    if (!checkSectorExists) {
      return notFound(req, res, customMessages.NO_SECTORS_FOUND);
    }

    updateSector(id, req.body)
      .then((data) => {
        if (data[0] !== 1) {
          return unprocessableEntity(
            req,
            res,
            customMessages.FAILURE_SECTORS_UPDATE
          );
        }
        return res.json({
          data: { message: customMessages.SUCCESS_SECTORS_UPDATE },
        });
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_SECTORS_UPDATE);
        next(err);
      });
  },

  /**
   * Delete Sector
   */
  async deleteSector(req, res, next) {
    const { id } = req.params;
    const checkSectorExists = await getSector(id);

    if (!checkSectorExists) {
      return notFound(req, res, customMessages.NO_SECTORS_FOUND);
    }

    deleteSector(id)
      .then((data) => {
        return res.status(HttpStatus.NO_CONTENT).json();
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_SECTORS_DELETE);
        next(err);
      });
  },
};

module.exports = sectorsController;
