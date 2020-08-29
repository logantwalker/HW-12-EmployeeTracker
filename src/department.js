const department = {
    getDepartments: function(connection){
        console.log("Selecting all departments...\n");
        connection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
           
        });
    }
}

module.exports = department;