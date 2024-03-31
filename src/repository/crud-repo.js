const { Logger } = require('../config');
 
class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){

        const response = await this.model.create(data);
        return response;

        // try {
        //     const response = await this.model.create(data);
        //     return response;
        // } catch (error) {
        //    Logger.error('Something went wrong in the crud rep : create');
        //    throw error; 
        // }
    }
    
    async destroy(data){
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        } catch (error) {
           Logger.error("Something went wrong in the crud rep : destroy"); 
        }
    }

    async get(data){
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
           Logger.error("Something went wrong in the crud rep : get"); 
        }
    }

    async getAll(data){
        try {
            const response = await this.model.findAll(data);
            return response;
        } catch (error) {
           Logger.error("Something went wrong in the crud rep : getAll"); 
        }
    }
    
    async update(id, data){
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
           Logger.error("Something went wrong in the crud rep : getAll"); 
        }
    }
}

module.exports = CrudRepository;