const inquirer = require("inquirer");
const mysql = require("mysql");


// importing modules
const connection = require('./src/connection')
const roles = require('./src/roles')
const department = require('./src/department');
const employees = require('./src/employee')

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startPromt()
});

function startPromt() {
  inquirer
    .prompt([{
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View Employees by Department', 'View Employees by Manager', 'Add New Employee', 'View All Roles', 'View All Departments', 'Quit'],
      name: 'action'
    }])
    .then(function (res) {

      interpret(res.action)

    }).catch((error) => { console.log(error) });
};

async function interpret(res) {
  switch (res) {
    case 'View All Employees':
      await employees.getEmployee(connection);
      startPromt();
      break;
    case 'View All Roles':
      await roles.getRoles(connection);
      startPromt();
      break;
    case 'View All Departments':
      await department.getDepartments(connection);
      startPromt();
      break;
    case 'View Employees by Department':
      await employees.employeesByDepartment(connection);
      startPromt();
      break;
    case 'View Employees by Manager':
      await employees.employeesByManager(connection);
      startPromt();
      break;
    case 'Add New Employee':
      captureNewEmployee();
      break;
    case 'Quit':
      connection.end()
      return
  }
};

function captureNewEmployee(){
  inquirer
    .prompt([{
      type: 'input',
      message: 'Enter Employee Name (FirstName LastName)',
      name: 'name'
    },
    {
      type: 'list',
      message: 'Please Choose Role:',
      choices:['Engineer I','Engineer II','Lead Engineer','Engineering Director','Contracts Associate','Contracts Specialist','Contracting Director','Human Resource Officer','Recruiting Specialist','HR Director','Chief Operations Officer','Chief Technical Officer','Chief Financial Officer','Chief Executive Officer'],
      name: 'role'
    },
  ])
    .then(function (res) {
      addEmployee(res);
    }).catch((error) => { console.log(error) });
}

async function addEmployee(data){
  await employees.add(connection,data);
  startPromt();
}
