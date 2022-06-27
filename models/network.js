const {Model} = require('objection');

class network extends Model {
    static get tableName(){
        return 'network'
    }
   
} 

module.exports = network