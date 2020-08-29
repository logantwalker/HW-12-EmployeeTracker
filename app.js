const inquirer = require("inquirer");
const mysql = require("mysql");


// importing modules
const connection = require('./src/connection')
const roles = require('./src/roles')
const department = require('./src/department');
const employees = require('./src/employee')

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPromt()
});

function startPromt(){

}

