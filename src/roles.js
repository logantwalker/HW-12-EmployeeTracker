const roles = {

    getRoles: function(connection){
        return new Promise(resolve =>{
            console.log("Selecting all roles...\n");
            connection.query("SELECT * FROM roles", function(err, res) {
                if (err) throw err;
                console.table(res);
                resolve(res);
            });
        });
    }
};

module.exports = roles;