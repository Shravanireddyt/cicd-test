const pool = require("../utils/db-connect");

// get fatca results
exports.getUboInfo = async(user_key) => {
    console.log(user_key);
    var sql = `SELECT * FROM ubo
        WHERE  user_key = '${user_key}'`;
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            con.query(sql, function(err, result) {
                con.release();
                if (!err) {
                    resolve(result);
                } else {
                    console.log(err);
                    return reject(err);
                }
            });
        });
    });
};

exports.updateUBO = async(data) => {
    let user_key = data.user_key;
    let id = data.id;
    console.log(user_key);
    let sql = "UPDATE ubo SET ? WHERE user_key = ? AND id = ?";
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            // console.log(con, data)
            if (err) { return reject(err) }
            con.query(sql, [data, user_key, id], function(err, result) {
                con.release();
                if (!err) {
                    console.log(result);
                    resolve(result);
                } else {
                    if (err) { return reject(err) }
                }
            });
        });
    });
};