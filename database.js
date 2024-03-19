const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'dashboard'
  });

db.getConnection((err) => {
    if(err){
        console.error('Error connecting', err);
    }else{
        console.log('Connected to MYSQL !!');
    }
});

module.exports = db;