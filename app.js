const mysql = require("mysql");
const connection = require('./src/connection')

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});