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
  inquirer
    .prompt([{
        type: 'list',
        message: '\nWhat would you like to do?',
        choices:['View All Employees','View All Departments','View All Roles','Quit'],
        name: 'action'
    }])
    .then(function(res){

      interpret(res.action)
      
    }).catch((error)=>{console.log(error)});
};

const interpret = (res) =>{
  switch(res){
    case 'View All Employees':
      employees.getEmployee(connection);
      break;
    case 'View All Roles':
      roles.getRoles(connection);
      break;
    case 'View All Departments':
      department.getDepartments(connection);
      break;
    case 'Quit':
      connection.end()
      return
  }
  startPromt()

}
