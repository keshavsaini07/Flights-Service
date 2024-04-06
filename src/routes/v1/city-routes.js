const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/city - POST
router.post('/', CityMiddlewares.validateCreateRequest, 
  CityController.createCity);

// /api/v1/cities/:id - DELETE
router.delete('/:id', CityController.deleteCity);

// /api/v1/airplanes/:id - PATCH
router.patch(
  '/:id',
  CityMiddlewares.validateCreateRequest,
  CityController.updateCity
);

module.exports = router;
