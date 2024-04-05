const express = require("express");
const { CityController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/city - POST
router.post("/",
  CityController.createCity);

// // /api/v1/airplanes - GET
// router.get("/", AirplaneController.getAirplanes);

// // /api/v1/airplanes/:id - GET
// router.get("/:id", AirplaneController.getAirplane);

// // /api/v1/airplanes/:id - DELETE
// router.delete("/:id", AirplaneController.destroyAirplane);

// // /api/v1/airplanes/:id - PATCH
// router.patch("/:id", AirplaneController.patchAirplane);

module.exports = router;
