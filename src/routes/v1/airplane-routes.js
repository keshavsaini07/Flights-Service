const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airplanes - POST
router.post('/', 
    AirplaneMiddlewares.validateRequest, AirplaneController.createAirplane);

// /api/v1/airplanes - GET
router.get('/', AirplaneController.getAirplanes);

router.get('/:id', AirplaneController.getAirplane);

// /api/v1/airplanes/:id - DELETE
router.delete('/:id', AirplaneController.destroyAirplane);

// /api/v1/airplanes/:id - PATCH
router.patch(
  "/:id",
  AirplaneMiddlewares.validateRequest,
  AirplaneController.patchAirplane
);

module.exports = router;
