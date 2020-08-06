// Quan ly va chia se ket noi

const util = require('util');
const mysql = require('mysql'); 

const pool = mysql.createPool({
    host: "localhost",
    user: "cress",
    password: "04101004",
    database: "alphablog"
});

pool.getConnection((err, connection) => {
    if(err){
        console.log(err);  
    }
    if(connection){
        console.log("connected to DB");
        connection.release();
        return;
    }
});

pool.query = util.promisify(pool.query);
module.exports = pool;