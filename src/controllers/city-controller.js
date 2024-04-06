const { CityService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

/*
 * POST : /cities
 * req-body { name: 'London' }
 */
async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
* DELETE : /cities/:id
* req-body {}
*/ 
async function deleteCity(req, res) {
  try {
    const airplane = await CityService.deleteCity(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
/*
* PATCH (PARTIAL UPDATE) : /airplanes/:id
* req-body {name : LONDON}
*/ 
async function updateCity(req, res) {
  try {
    const city = await CityService.updateCity(
      req.params.id,
      req.body
    );
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity,
};