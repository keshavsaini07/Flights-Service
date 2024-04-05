const CrudRepository = require('./crud-repo');

module.exports = {
  CrudRepository,
  AirplaneRepository: require('./airplane-repository'),
  CityRepository: require('./city-repository')
};