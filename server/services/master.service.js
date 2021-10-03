const pool = require("../utils/db-connect");

exports.getBanksDetails = async() => {
    var sql = `SELECT * FROM master_bank`;
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

exports.getExemptionCat = async() => {
    var sql = `SELECT * FROM master_exemption`;
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


exports.getStateData = async() => {
    var sql = `SELECT * FROM master_state`;
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
exports.getCountryData = async() => {
    var sql = `SELECT * FROM master_countries`;
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
exports.getCityData = async() => {
    var sql = `SELECT * FROM master_cities`;
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
exports.getProductData = async() => {
    var sql = `SELECT * FROM master_product where product_category = 'OE'`;
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