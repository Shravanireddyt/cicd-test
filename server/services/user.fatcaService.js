const pool = require("../utils/db-connect");



// get fatca results
exports.getFatcaInfo = async(user_key) => {
    console.log(user_key)
    var sql = `SELECT * FROM additional_kyc
        INNER JOIN fatca
        ON additional_kyc.user_key = fatca.user_key
        WHERE additional_kyc.user_key = '${user_key}'`;
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, function(err, result) {
                con.release();
                if (!err) {
                    resolve(result);
                } else {
                    console.log(err);
                    reject(err);
                }
            });
        })
    });
};

exports.updateFatca = async(data) => {
    let user_key = data.user_key;
    console.log(user_key)
    let sql = "UPDATE fatca SET ? WHERE user_key = ?";
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            // console.log(con, data)
            if (err) { return reject(err) }
            con.query(sql, [data, user_key], function(err, result) {
                con.release();
                if (!err) {
                    console.log(result)
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        })
    });
};