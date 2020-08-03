// Quan ly va chia se ket noi

const util = require('util');
const mysql = require('mysql'); 

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "haithanh",
    password: "cress1004",
    database: "alphablog"
});

pool.getConnection((err, connection) => {
    if(err){
        console.error("Somethings went wrong");
        throw err;
    }
    if(connection){
        connection.release();
        return;
    }
});

pool.query = util.promisify(pool.query);
module.exports = pool;