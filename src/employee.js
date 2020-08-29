const employees = {

    getEmployee: function(connection){
        console.log("Selecting all employees...\n");
        connection.query("SELECT * FROM employees", function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
        });
    }
};

module.exports = employees;