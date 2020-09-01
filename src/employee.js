

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

    add: function(connection,data){
        return new Promise(resolve =>{
            let name = data.name.split(' ');
            let first_name = name[0];
            let last_name = name[1];
            let role_id;
            let manager_id;
            const determineDetails = () =>{
                switch(data.role){
                    case 'Chief Executive Officer':
                        role_id = 1;
                        
                        break;
                    case 'Chief Financial Officer':
                        role_id = 2;
                        manager_id = 1;
                        break;
                    case 'Chief Technical Officer':
                        role_id = 3;
                        manager_id = 1;
                        break;
                    case 'Chief Operations Officer':
                        role_id = 4;
                        manager_id = 1;
                        break;
                    case 'Engineering Director':
                        role_id = 5;
                        manager_id = 3;
                        break;
                    case 'Lead Engineer':
                        role_id = 6;
                        manager_id = 5;
                        break;
                    case 'Engineer II':
                        role_id = 7;
                        manager_id=5;
                        break;
                    case 'Engineer I':
                        role_id = 8;
                        manager_id=5;
                        break;
                    case 'HR Director':
                        role_id = 9;
                        manager_id=4;
                        break;
                    case 'Recruiting Specialist':
                        role_id = 10;
                        manager_id=9;
                        break;
                    case 'Human Resource Officer':
                        role_id = 11;
                        manager_id=9;
                        break;
                    case 'Contracting Director':
                        role_id = 12;
                        manager_id=2;
                        break;
                    case 'Contracts Specialist':
                        role_id = 13;
                        manager_id=12;
                        break;
                    case 'Contracts Associate':
                        role_id = 14;
                        manager_id=12;
                        break;
                }
            }
            determineDetails();

            console.log("Creating New Employee...\n");
            connection.query(`INSERT INTO employees VALUE (default,${first_name},${last_name},${role_id},${manager_id})`,
             function(err, res) {
                if (err) throw err;
                console.table(res);
                resolve(res);
            });
        });
    }
};

module.exports = employees;