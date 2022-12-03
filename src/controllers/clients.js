import HttpStatus from "http-status-codes";
import customMessages from "../constants/customMessages";
import {
  conflict,
  notFound,
  unprocessableEntity,
} from "../middlewares/errorHandler";
import {
  createClient,
  getAllClients,
  getClient,
  getClientbyEmail,
  getClientbyField,
  updateClient,
} from "../services/clientService";
import logger from "../utils/logger";

const clientsController = {
  /**
   * List of Client
   */
  async fetchAll(req, res, next) {
    getAllClients()
      .then((data) => res.json({ data }))
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
