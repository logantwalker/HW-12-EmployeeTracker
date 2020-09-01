const department = {
    getDepartments: function(connection){
        return new Promise(resolve =>{
            console.log("Selecting all departments...\n");
            connection.query("SELECT * FROM departments", function(err, res) {
                if (err) throw err;
                console.table(res);
                resolve(res);
            });
        });
    },

    add: function(connection,data){
        return new Promise(resolve =>{
            console.log("Creating new department...\n");
            connection.query(`INSERT INTO departments VALUE (default,'${data.name}')`, function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    },

    _deptList: function(connection){
        return new Promise(resolve =>{
            connection.query("SELECT name FROM departments", function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    }
}

module.exports = department;