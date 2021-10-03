const pool = require("../utils/db-connect");

exports.getAdditionalKyc = async(userKey) => {
    var sql = `SELECT * FROM additional_kyc
        WHERE additional_kyc.user_key = '${userKey}'`;
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
        });
    });
};

exports.updateKyc = async(data) => {
    let user_key = data.user_key;
    let date = data.net_worth_date.slice(0, 10);
    console.log(date)
    data.net_worth_date = date
    data.insert_date = data.insert_date.slice(0, 10);
    let sql = "UPDATE additional_kyc SET ? WHERE user_key = ?";
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
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
        });
    });
};