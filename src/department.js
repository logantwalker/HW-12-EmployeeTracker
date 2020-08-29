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
    }
}

module.exports = department;