import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import { filterClients } from "../filter/client";
import {
  conflict,
  notFound,
  unprocessableEntity,
} from "../middlewares/errorHandler";
import {
  createClient,
  getAllClients,
  getAllClientsCount,
  getClient,
  getClientbyField,
  updateClient,
} from "../services/clientService";
import logger from "../utils/logger";
import { getMetaDetail } from "../utils/reusableUtils";

const clientsController = {
  /**
   * List of Client
   */
  async fetchAll(req, res, next) {
    let query = {};

    let { page: pageNo, limit } = req.query;
    // set default or given casted page No and limit (per page)
    pageNo = pageNo ? Number(pageNo) : 1;
    limit = limit ? Number(limit) : Number(process.env.APP_PER_PAGE);

    const filterBody = await filterClients(req.query);

    const totalCount = await getAllClientsCount(filterBody);

    // build query for pagination
    query.skip = Number((pageNo - 1) * limit);
    query.limit = Number(limit);

    let meta = await getMetaDetail(pageNo, limit, totalCount);

    getAllClients(filterBody, query)
      .then((data) => res.json({ data, meta }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_CLIENTS);
        next(err);
      });
  },

  /**
   * show Client
   */
  async show(req, res, next) {
    const clientId = req.params.id;

    const clientDetail = await getClient(clientId);

    if (!clientDetail) {
      logger.error(`${customMessages.ERROR_FETCHING_CLIENT_ID} ${clientId}`);
      return notFound(req, res, customMessages.NO_CLIENT_FOUND);
    }

    return res.json({ data: clientDetail });
  },

  /**
   * Create new client
   */

  async createClient(req, res, next) {
    const checkClientEmailExists = await getClientbyField({
      email: req.body.email,
    });

    if (checkClientEmailExists) {
      return conflict(req, res, customMessages.EMAIL_ALREADY_USED);
    }

    const checkClientNameExists = await getClientbyField({
      company_name: req.body.company_name,
    });

    if (checkClientNameExists) {
      return conflict(req, res, customMessages.EMAIL_ALREADY_USED);
    }

    createClient(req.body)
      .then((data) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_CREATING_CLIENT);
        next(err);
      });
  },

  /**
   * Update client
   */

  async updateClient(req, res, next) {
    const { id } = req.params;
    const checkClientExists = await getClient(id);

    if (!checkClientExists) {
      return notFound(req, res, customMessages.NO_CLIENT_FOUND);
    }

    updateClient(id, req.body)
      .then((data) => {
        if (data[0] !== 1) {
          return unprocessableEntity(
            req,
            res,
            customMessages.FAILURE_CLIENT_UPDATE
          );
        }
        return res.json({
          data: { message: customMessages.SUCCESS_CLIENT_UPDATE },
        });
      })
      .catch((err) => {
        logger.error(customMessages.FAILURE_CLIENT_UPDATE);
        next(err);
      });
  },
};

module.exports = clientsController;
