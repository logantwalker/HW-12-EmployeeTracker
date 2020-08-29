const roles = {

    getRoles: function(connection){
        console.log("Selecting all roles...\n");
        connection.query("SELECT * FROM roles", function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
        });
    }
};

module.exports = roles;