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
    }
};

module.exports = employees;