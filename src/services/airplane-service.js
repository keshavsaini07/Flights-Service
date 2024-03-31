const {AirplaneRepository} = require('../repository');
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();
    
async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
      // The data the client is sending is not proper hence TypeError(wrong type), SequelizeValidationError(wrong validation of fields)
      if (error.name == "SequelizeValidationError") {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation,
          StatusCodes.BAD_REQUEST
        );
      }

      throw new AppError( 
        "Cannot create a new airplane object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

module.exports= {
    createAirplane
}