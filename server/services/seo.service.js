const pool = require("../utils/db-connect");

exports.getSeoData = async(isin) => {
    if (isin) {
        var sql = `SELECT * FROM seo_metrics where isin='${isin}'`;
    } else {
        var sql = `SELECT * FROM seo_metrics`;
    }
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

exports.addSeo = async(data) => {

    let sql = `INSERT INTO seo_metrics (isin, meta_title, meta_desc, meta_keys) VALUES ('${data.isin}','${data.meta_title}', '${data.meta_desc}', '${data.meta_keys}')`;
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, function(err, result) {
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

exports.updateSeo = async(data) => {
    let isin = data.isin;
    let sql = "UPDATE seo_metrics SET ? WHERE isin = ?";
    return new Promise(function(resolve, reject) {
        pool.getConnection((err, con) => {
            if (err) { return reject(err) }
            con.query(sql, [data, isin], function(err, result) {
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