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
            console.log("Selecting all employees...\n");
            connection.query("SELECT departments.name AS 'Department Name', first_name, last_name, roles.title FROM employees JOIN roles ON role_id = roles.id JOIN departments ON departments.id = roles.deparment_id",
             function(err, res) {
                if (err) throw err;
                console.table(res);
                resolve(res);
            });
        });
    }
};

module.exports = employees;