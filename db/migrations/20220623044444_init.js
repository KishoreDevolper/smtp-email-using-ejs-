exports.up = function(knex) {
    return knex.schema
  .createTable('registers',(table)=>{
        table.increments();
        table.string('name')
        table.string('email')
        table.string('password')
        
        table.timestamps(true,true)
    })
  .createTable('category',(table)=>{
      table.increments();
      table.string('category_name')
      table.timestamps(true,true)
  })
  .createTable('network',(table)=>{
    table.increments();
    table.string('name')
    table.timestamps(true,true)
})
.createTable('topup',(table)=>{
  table.increments();
  table.string('name')
  table.timestamps(true,true)
})
.createTable('billing',(table)=>{
  table.increments();
  table.string('name')
  table.timestamps(true,true)
})
 
    
};

exports.down = function(knex) {
  return knex.schema.dropTableExists('registers')
  .dropTableExists('category')
  .dropTableExists('network')
  .dropTableExists('topup')
  .dropTableExists('biling')
};
