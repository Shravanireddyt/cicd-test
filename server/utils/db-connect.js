const mysql = require('mysql')

var pool = mysql.createPool({
    host: "takeoff.in",
    user: "finnovat_uat",
    database: "finnovat_uat",
    password: "wp7[uzibJSf!",
    connectionLimit: 10
});
module.exports = pool

// var mysql = require("mysql");

// var con = mysql.createConnection({
//     host: "takeoff.in",
//     user: "finnovat_uat",
//     database: "finnovat_uat",
//     password: "wp7[uzibJSf!",
// });
// module.exports = con