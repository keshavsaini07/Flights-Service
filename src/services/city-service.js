const {CityRepository} = require("../repository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data){
    try {
      const city = await cityRepository.create(data);
      return city;
    } catch (error) {
      // The data the client is sending is not proper hence TypeError(wrong type), SequelizeValidationError(wrong validation of fields)
      if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }

      throw new AppError(
        "Cannot create a new city object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

module.exports = {
  createCity,
};
