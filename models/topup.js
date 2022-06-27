const {Model} = require('objection');

class topup extends Model {
    static get tableName(){
        return 'topup'
    }
   
} 

module.exports = topup