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


let RolesList = [];
let DeptList = [];
let employeeList = [];

async function populateRolesList(){
  RolesList = [];
  let rawData = await roles._roleList(connection);
  rawData.forEach(el =>{
    RolesList.push(el.title);
  })
}
populateRolesList();

async function populateDeptList(){
  DeptList = [];
  let rawData = await department._deptList(connection);
  rawData.forEach(el =>{
    DeptList.push(el.name);
  })
}
populateDeptList();

async function populateEmployeeList(){
  employeeList = [];
  let rawData = await employees._listEmployees(connection);
  rawData.forEach(el =>{
    employeeList.push(el.name);
  })
}
populateEmployeeList();

function startPromt() {
  inquirer
    .prompt([{
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View Employees by Department', 'View Employees by Manager', 'Add New Employee',"Update Employee's Role", 'View All Roles','Add New Role','Add New Department', 'View All Departments', 'Quit'],
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
    case 'Add New Role':
      captureRoleInfo();
      break;
    case 'Add New Department':
      captureNewDept();
      break;
    case "Update Employee's Role":
      captureUpdate();
      break;
    case 'Quit':
      connection.end()
      return
  }
};

function captureUpdate(){
  inquirer
    .prompt([{
      type: 'list',
      message: 'Choose Employee to Update:',
      choices: employeeList,
      name: 'name'
    },
    {
      type: 'list',
      message: 'Please select new role:',
      choices: RolesList,
      name: 'role'
    }
  ])
    .then(function (res) {
      updateEmployee(res);
    }).catch((error) => { console.log(error) });
}

async function updateEmployee(data){
  let role_id;
  for(let i = 0; i<RolesList.length;i++){
    if(data.role === RolesList[i]){
      role_id = i + 1;
    }
  }
  let manager_id = await employees._getManagerId(connection,role_id);
  manager_id = manager_id[0].manager_id;

  await employees.updateEmployee(connection,data,role_id,manager_id);
  await employees.employeesByDepartment(connection);
  startPromt();
}

function captureNewDept(){
  inquirer
    .prompt([{
      type: 'input',
      message: 'Enter Department Name:',
      name: 'name'
    }
  ])
    .then(function (res) {
      addDepartment(res);
    }).catch((error) => { console.log(error) });
}

async function addDepartment(data){
  await department.add(connection,data);
  await department.getDepartments(connection);
  populateDeptList();
  startPromt();
}

function captureRoleInfo(){
  inquirer
    .prompt([{
      type: 'input',
      message: 'Enter Role Title:',
      name: 'title'
    },
    {
      type: 'number',
      message: 'Please enter salary information:',
      name: 'salary'
    },
    {
      type: 'list',
      message: 'What department does this role belong to?',
      choices: DeptList,
      name: 'department'
    },
    {
      type: 'list',
      message: 'Who manages this position?',
      choices: RolesList,
      name: 'manager'
    }
  ])
    .then(function (res) {
      addRole(res);
    }).catch((error) => { console.log(error) });
}

async function addRole(data){
  let department_id;
  let manager_id;
  let role_id = RolesList.length + 1;
  for(let i=0; i < DeptList.length; i++){
    if(data.department === DeptList[i]){
      department_id = i + 1;
    }
  }
  for(let i = 0; i<RolesList.length;i++){
    if(data.manager === RolesList[i]){
      manager_id = i + 1;
    }
  }

  await roles.add(connection,data,department_id);
  await roles._updateHeirarchy(connection,role_id,manager_id)
  await roles.getRoles(connection);
  populateRolesList();
  startPromt()
}


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
      choices: RolesList,
      name: 'role'
    },
  ])
    .then(function (res) {
      addEmployee(res);
    }).catch((error) => { console.log(error) });
}


async function addEmployee(data){
  let role_id;
  const determineDetails = () =>{
    for(let i = 0; i<RolesList.length;i++){
      if(data.role === RolesList[i]){
        role_id = i + 1;
      }
    }
  }
  determineDetails();
  console.log(role_id);
  let manager_id = await employees._getManagerId(connection,role_id);
  manager_id = manager_id[0].manager_id;
  await employees.add(connection,data,role_id,manager_id);
  await employees.getEmployee(connection);
  populateRolesList();
  populateEmployeeList();
  startPromt();
}
