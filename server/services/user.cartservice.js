const pool = require('../utils/db-connect')



exports.getCartItems = (data) => {
    let sql;
    if (data.user_key) {
        sql = `SELECT * FROM cart WHERE user_key = '${data.user_key}'`
    } else { sql = `SELECT * FROM cart` }

    return new Promise((resolve, reject) => {
        pool.query(sql, (err, data) => {
            if (err) { return reject(err) }
            resolve(data)
        })
    })
}