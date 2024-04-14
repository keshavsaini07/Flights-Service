const CrudRepository = require("./crud-repo");
const { Flight, Airplane, Airport } = require("../models");
const {Sequelize} = require('sequelize')

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
        },
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
