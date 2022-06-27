const {Model} = require('objection');

class category extends Model {
    static get tableName(){
        return 'category'
    }
   
} 

module.exports = category