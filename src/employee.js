

const employees = {

    getEmployee: function(connection){
        return new Promise(resolve =>{
            console.log("Selecting all employees...\n");
            connection.query("SELECT * FROM employees", function(err, res) {
                if (err) throw err;
                console.table(res);
                resolve(res);
            });
        });
    },

    employeesByDepartment: function(connection){
        return new Promise(resolve =>{
            console.log("Showing Employees by Department...\n");
            connection.query("SELECT departments.name AS 'Department Name', first_name, last_name, roles.title FROM employees JOIN roles ON role_id = roles.id JOIN departments ON departments.id = roles.deparment_id",
             function(err, res) {
                if (err) throw err;
                console.table(res);
                resolve(res);
            });
        });
    },

    employeesByManager: function(connection){
        return new Promise(resolve =>{
            console.log("Showing Employees by Manager...\n");
            connection.query("Select concat(e.last_name,',',e.first_name) AS 'Direct Report', concat(m.last_name,',',m.first_name) AS Manager from employees e inner join employees m ON m.role_id = e.manager_id order by m.role_id",
             function(err, res) {
                if (err) throw err;
                console.table(res);
                resolve(res);
            });
        });
    },

    add: async function(connection,data,role_id,manager_id){
        return new Promise(resolve =>{
            let name = data.name.split(' ');
            console.log("Creating New Employee...\n");
            connection.query(`INSERT INTO employees VALUE (default,'${name[0]}','${name[1]}',${role_id},${manager_id})`,
             function(err, res) {
                if (err) throw err;
                
                resolve(res);
            });
        });
    },
    updateEmployee: function(connection,data,role_id,manager_id){
        return new Promise(resolve =>{
            let name = data.name.split(',');
            connection.query(`UPDATE employees SET role_id = ${role_id}, manager_id = ${manager_id} WHERE last_name = '${name[0]}'`, function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    },

    _getManagerId: function(connection,role_id){
        return new Promise(resolve =>{
            connection.query(`SELECT manager_id FROM heirarchy WHERE role_id = ${role_id}`, function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    },

    _listEmployees: function(connection){
        return new Promise(resolve =>{
            connection.query("SELECT concat(last_name,',',first_name) AS name FROM employees ORDER BY last_name", function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    }
};

module.exports = employees;