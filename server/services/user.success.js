const pool = require("../utils/db-connect")

exports.addUser = (data) => {
    let sql = `INSERT INTO users_status (${data.column_name},user_key) VALUES (${data.value}, '${data.user_key}')`

    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }

            con.query(`select * from users_status where user_key = '${data.user_key}'`, (err, result) => {
                if (err) {
                    con.release()
                    return reject(err)
                }
                // console.log(result)
                if (result.length > 0) {
                    console.log(result[0][data.column_name])
                    if (result[0][data.column_name]) {
                        return resolve({ message: `Time for : ${data.column_name} is already there.` })
                    }
                    let newSql = `UPDATE users_status SET ${data.column_name} = '${data.value}' WHERE user_key = '${data.user_key}'`
                    con.query(newSql, (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                        return resolve({ result, message: "user status updated successfully." })
                    })
                } else {
                    con.query(sql, (err, result) => {
                        con.release()
                        if (err) { return reject(err) }
                        resolve({ result, message: "Date and time for this user added successfully." })
                    })
                }
            })

        })
    })
}

exports.updateUser = (data) => {
    console.log(new Date(parseInt(data.value)))
    let sql = `UPDATE users_status SET ${data.column_name} = '${data.value}' WHERE user_key = '${data.user_key}'`

    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, (err, result) => {
                // console.log(err)
                con.release()
                console.log(err)
                if (err) { return reject(err) }
                resolve({ result, message: "Time updated successfully." })
            })
        })
    })
}

exports.getUsersStatus = (data) => {
    let sql;
    if (data.user_key) {
        sql = `SELECT * FROM users_status where user_key = '${data.user_key}'`
    } else {
        sql = `SELECT * FROM users_status`
    }

    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) { return reject(err) }
            // console.log(result)
            resolve(result)
        })
    })
}