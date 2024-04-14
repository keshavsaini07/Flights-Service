'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplaneDetails"
      });
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "departureAirportDetails",
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        as: "arrivalAirportDetails"
      });
    }
  }
  Flight.init(
    {
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false, 
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: DataTypes.STRING,
      },
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight ;
};

/*
 * SQL QUERY for checking if foreign key constraint has been applied or not:
  select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME='flights' AND CONSTRAINT_SCHEMA='flights'; 
**/