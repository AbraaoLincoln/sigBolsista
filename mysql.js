const mysql = require('mysql');

// var pool = mysql.createPool({
//     "user": process.env.MYSQL_USER,
//     "password": process.env.MYSQL_PASSWORD,
//     "database": process.env.MYSQL_DATABASE,
//     "host": process.env.MYSQL_HOST,
//     "port": process.env.MYSQL_PORT,
//     "multipleStatements" : true
// });

var pool = mysql.createPool({
    "user": "root",
    "password": "123",
    "database": "mydb",
    "host": "127.0.0.1",
    "port": "3306",
    "multipleStatements" : true
});


exports.pool = pool;