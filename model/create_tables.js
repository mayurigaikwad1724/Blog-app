// const mysql = require('mysql')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Mayuri@123",
//     database: "blog"
// })

// db.connect(function(err){
//     if (err) throw err;
//     console.log("connected")
// })
// db.query("CREATE DATABASE blog",function(err,result){
//     if (err){
//         console.log("Database alredy created");
//     }
//     else{
//         console.log("Database created")
//     }
// });



const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Mayuri@123',
        database: 'blog'
    }
}
const knex = require('knex')(options);
  
  
knex.schema.hasTable('register').then(function (exists) {
    if (!exists) {
        knex.schema.createTable('register', (table) => {
            table.increments('user_id').primary();
            table.string('name', 255).notNullable()
            table.string('email', 255).notNullable()
            table.string('password', 255).notNullable()
            table.unique('email')
        }).then(() => console.log("table created"))
            .catch((err) => { console.log("alredy creted") })
    }
})
  
knex.schema.hasTable('post_data').then(function (exists) {
    if (!exists) {
        knex.schema.createTable('post_data', (table) => {
  
            table.increments('post_id').primary();
            table.string('title', 255).notNullable()
            table.string('text', 255).notNullable()
            table.string('user_id').notNullable();
  
        }).then(() => console.log("table created"))
            .catch((err) => { console.log("alredy creted") })
  
            
    }
})



knex.schema.hasTable('likedislike').then(function (exists) {
    if (!exists) {
        knex.schema.createTable('likedislike', (table) => {
            table.increments('id').primary();
            table.string('like', 255).notNullable()
            table.string('dislike', 255).notNullable()
            table.integer('user_id').notNullable();
            table.integer('post_id').notNullable();
  
  
        }).then(() => console.log("table created"))
            .catch((err) => { console.log("alredy creted")})
  
            
    }
})
  


module.exports=knex
  