import customMessages from "../constants/customMessages";
import { getAllCountries } from "../services/countryService";
import logger from "../utils/logger";

const sectorsController = {
  /**
   * List of sectors
   */
  async list(req, res, next) {
    // const filterBody = await filterCountries(req.query);

    // if (!req.user) {
    //   filterBody.status = true;
    // }

    getAllCountries()
      .then((data) => res.json({ data }))
      .catch((err) => {
        logger.error(customMessages.ERROR_LISTING_SECTORS);
        next(err);
      });
  },
};

module.exports = sectorsController;
