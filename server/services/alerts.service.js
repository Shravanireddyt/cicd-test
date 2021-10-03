const { sendMail } = require("../helpers/mailSender")
const pool = require("../utils/db-connect")

exports.getAlerts = (data) => {
    let sql = "SELECT * from user_alerts"
    if (data.user_key) {
        sql = `SELECT * from user_alerts WHERE user_key = '${data.user_key}'`
    }
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) { return reject(err) }
            resolve(result)
        })
    })
}

exports.raiseAlert = async(data) => {
    let promises = []
    let url = await generateURL()
    for (let field of data.fields) {
        promises.push(createAlert(field))
    }

    function createAlert(field) {
        return new Promise((resolve, reject) => {
            let sqlAlert = `INSERT INTO
                user_alerts(user_key,email, title, description,link,form_name, field_name)
                VALUES('${data.user_key}','${data.email}', '${data.title.trim()}',  '${data.description.trim()}','${url.trim()}','${data.form_name.trim()}','${field.trim()}')`
            pool.query(sqlAlert, (err, result) => {
                if (err) { return reject(err) }
                resolve(result)
            })
        })
    }

    function generateURL() {
        console.log("three")
        let formURL;
        let sqlFromUrl = `SELECT * FROM takeoff_urls`
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) return reject(err)
                con.query(sqlFromUrl, (err, urls) => {
                    if (err) {
                        con.release()
                        return reject(err)
                    }
                    formURL = urls[0][`${data.form_name.trim()}`]
                    let fieldsString = '';
                    let length = data.fields.length - 1
                    data.fields.forEach((field, index) => {
                        if (index !== length) {
                            fieldsString = fieldsString + field + ","
                        } else {
                            fieldsString = fieldsString + field
                        }
                    })
                    let bufferObj = Buffer.from(fieldsString, "utf8"),
                        base64String = bufferObj.toString("base64");
                    formUrl = formURL + '/' + base64String
                    resolve(formUrl)
                })
            })
        })
    }
    sendMail({...data, url: url })
    return Promise.all(promises)
}



exports.resolveAlert = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE  user_alerts SET status=1 WHERE user_key='${data.user_key}' AND id=${data.id}`
        pool.query(sql, (err, result) => {
            if (err) { return reject(err) }
            resolve(result)
        })
    })
}