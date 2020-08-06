const pool = require('./pool');

function Article() {};

Article.prototype = {
    // find by user_id
    find: function(id = null) {
        var sql = `select * from articles where id = ?`;
        return new Promise((resolve, reject) => {
            if(id) {
                pool.query(sql, id, function(err, result) {
                    if(err) return reject(err);
                    return resolve(result);
                });
            }
            else 
                return resolve(null);
        });
    },

    // if user is number, find user by user_id
    // else find user by name
    findByUser: function(user = null) {
        return new Promise((resolve, reject) => {
            if(user) {
                if(Number.isInteger(user)) {
                    var sql = `select * from articles where user_id = ?`;
                } else {
                    var sql =   `select * from articles inner join user 
                                on articles.user_id = users.id where user_name = ?`
                }
                pool.query(sql, user, function(err, result){
                    if(err) return reject(err);
                    return resolve(result);
                });
            } else {
                return resolve(null);
             }
        });
    },

    // get user_id from article_id
    getUser: function(id = null) {
        var sql =   `select users.id from users inner join articles on
                    users.id = articles.user_id where articles.id = ?` ;
        return new Promise((resolve, reject) => {
            pool.query(sql, id, function(err, result){
                if(err) return reject(err);
                return resolve(result[0].id)
            });
        });
    },

    //create
    create: function(title, description, user_id) {
        let sql = `insert into articles (title, description, user_id) values (?,?,?)` ;
        var bind = [title, description, id];
        return new Promise((resolve, reject) => {
            if(title == null || description == null || user_id == null)
                return reject(new Error('Title, description, user_id must be not null'));
            pool.query(sql, bind, function(err, result){
                if(err) return reject(err);
                if(result.affectedRows != 1){
                    console.log('Create an article error');
                    return resolve(null);
                } else {
                    console.log("this is return value: "+result.insertId);
                    return resolve(result.insertId);
                }
            });
        });
    },

    // get all from articles:
    getAll: function() {
        var sql = `select * from articles`;
        return new Promise((resolve, reject) => {
            pool.query(sql, function(err, result){
                if(err) return reject(err);
                return resolve(result);
            });
        });
    },
    // delete articles by id:
    delete: function(id = null) {
        var sql = `delete from articles where id = ?`;
        return new Promise((resolve, reject) => {
            pool.query(sql, id, function(err, result){
                if(err) return reject(err);
                return resolve(result);
            });
        });
    } 
}

module.exports = Article;