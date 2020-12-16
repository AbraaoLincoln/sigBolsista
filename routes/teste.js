const mysql = require('../mysql').pool;

mysql.getConnection((error, conn) => {
    conn.query(
        'SELECT * FROM BOLSISTA',
        (error, results, fields) => {
            conn.release();
            if(error) { console.log(error)};

            console.log(results);
        }
    )
});