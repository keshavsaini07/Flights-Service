const CrudRepository = require("./crud-repo");
const { Flight, Airplane, Airport, city } = require("../models");
const {Sequelize} = require('sequelize');
const db = require('../models');
const { addRowLockOnFlights } = require("./queries");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filter, sort){
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetails",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirportDetails",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirportDetails.code")
            ),
          },
          include: {
            model: city,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirportDetails",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirportDetails.code")
            ),
          },
          include: {
            model: city,
            required: true,
          },
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true){
    await db.sequelize.query(addRowLockOnFlights(flightId));
    const flight = await Flight.findByPk(flightId);
    if(+(dec)){
      await flight.decrement('totalSeats', { by: seats });
    }else{ 
      await flight.increment("totalSeats", { by: seats });
    }
    await flight.reload();
    return flight;
  }
}

module.exports = FlightRepository;
