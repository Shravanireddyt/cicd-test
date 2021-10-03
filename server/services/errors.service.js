const pool = require("../utils/db-connect");

exports.addErrors = async(data) => {
    let user_key = data.user_key
    const addError = (error) => {
        return new Promise(function(resolve, reject) {
            let sql = `INSERT INTO onboarding_errors (user_key, nse_errors) VALUES ('${user_key}','${error}')`;
            pool.getConnection(async(err, con) => {
                if (err) { return reject(err) }
                con.query(sql, function(err, result) {
                    con.release();
                    if (err) { return reject(err) }
                    resolve(result)
                });
            });
        });
    }
    let promises = []
    for (let error of data.errors) {
        console.log(data.errors)
        promises.push(addError(error))
    }
    console.log("fisrt")
    return Promise.all(promises)
};
exports.getErrors = async(tableName, data) => {
    let sql = `select * from ${tableName} where user_key = '${data.user_key}'`
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, (err, result) => {
                con.release()
                if (err) { return reject(err) }
                resolve(result)
            })
        })
    })
}
exports.deleteError = async(id, user_key, tableName) => {
    let sql = `DELETE from ${tableName} WHERE user_key = '${user_key}' AND id = ${id}`
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, (err, result) => {
                // console.log(err)
                con.release()
                if (err) { return reject(err) }
                resolve(result)
            })
        })
    })
}