const pool = require('./pool');
 
function User() {};

User.prototype = {
    getAll: function() {
        var sql = `select * from users`;
        return new Promise((resolve, reject) => {
            pool.query(sql, function(err, result){
                if(err) return reject(err);
                return resolve(result);
            });
        })
    },
    find: function(id = null) {
        var sql = `select * from users where id = ?`;
        return new Promise((resolve, reject) => {
            if(id) {
                pool.query(sql, id, function(err, result) {
                    if(err) return reject(err);
                    return resolve(result);
                });
            }
            else return resolve(null);
        });
    },
   create: function(username, email, password) {
        let sql = `insert into users (username, email, password)
                    values (?, ?, ?)`;
        var bind = [username, email, password];
        return new Promise((resolve, reject) => {
            if(username == null || email == null || password == null)
                return reject(new Error("Username, email or password is null!"));
            pool.query(sql, bind, function(err, result) {
                if(err) return reject(err);
                if(result.affectedRows != 1) {
                    console.log("create a user error!");
                    return resolve(null);
                } else {
                    return resolve(result.insertId);
                }
            });
        });
   },
   delete: function(id = null) {
       var sql = `delete from users where id = ?`;
       return new Promise((resolve, reject) => {
           pool.query(sql, id, function(err, result){
               if(err) return reject(err);
               return resolve(result);
           });
       });
   },
}

module.exports = User; 