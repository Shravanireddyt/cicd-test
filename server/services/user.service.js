const pool = require("../utils/db-connect");


exports.contactRequests = () => {
    let sql = `select * from call_now`
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

exports.getUsersInfo = async() => {
    var sql = `SELECT * FROM landing_register 
        INNER JOIN landing_pan_data ON
        landing_register.user_key = landing_pan_data.user_key`;
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
// get ucc data
exports.getActiveUsers = async() => {
    var sql = `SELECT * FROM landing_register 
        INNER JOIN landing_pan_data ON
        landing_register.user_key = landing_pan_data.user_key
        INNER JOIN ucc ON
        landing_pan_data.user_key = ucc.user_key`;
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, function(err, result) {
                con.release();
                if (!err) {
                    // console.log(result)
                    resolve(result);
                } else {
                    console.log(err);
                    reject(err);
                }
            });
        })
    });
};
exports.getRegisteredUsers = async() => {
    var sql = `SELECT * FROM landing_register `;
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
// update ucc
exports.updateUcc = async(data) => {
    let user_key = data.user_key;
    let sql = "UPDATE ucc SET ? WHERE user_key = ?";
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, [data, user_key], function(err, result) {
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

exports.addIIN = async(data) => {
    let user_key = data.user_key;
    let iin = data.iin;
    let sql = 'UPDATE ucc SET iin = ? WHERE user_key = ?'
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, [iin, user_key], (err, result) => {
                // console.log(err)
                con.release()
                if (err) { return reject(err) }
                resolve(result)
            })
        })
    })
}