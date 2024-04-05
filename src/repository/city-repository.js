const CrudRepository = require("./crud-repo");
const { city } = require("../models");

class CityRepository extends CrudRepository {
  constructor() {
    super(city);
  }
}

module.exports = CityRepository;
