const {Model} = require('objection');

class billing extends Model {
    static get tableName(){
        return 'billing'
    }
   
} 

module.exports = billing