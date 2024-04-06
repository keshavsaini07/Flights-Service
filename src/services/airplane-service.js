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
      if (error.name == 'SequelizeValidationError') {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation,
          StatusCodes.BAD_REQUEST
        );
      }

      throw new AppError( 
        'Cannot create a new airplane object',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function getAirplanes() {
    try {
        const airplane = await airplaneRepository.getAll();
        return airplane;
    } catch (error) {
      throw new AppError( 
        'Cannot fetch data of all the airplanes',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
      if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError(
          'The airplane requested is not present.',
          error.statusCode
        );
      }
      throw new AppError( 
        'Cannot fetch data of the airplane',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function destroyAirplane(id) {
    try {
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    } catch (error) {
      if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError(
          'The airplane requested to delete is not present.',
          error.statusCode
        );
      }
      throw new AppError( 
        'Cannot fetch data of the airplane',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}

async function patchAirplane(id, data) {
  try {
    const airplane = await airplaneRepository.update(id, data);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        'The airplane requested to update is not present.',
        error.statusCode
      );
    }
    if (error.name == 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      'Cannot fetch data of the airplane',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  patchAirplane,
};