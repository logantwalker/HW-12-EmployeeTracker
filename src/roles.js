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
    },

    add: function(connection,data,department_id){
        return new Promise(resolve =>{
            console.log("Creating new role...\n");
            connection.query(`INSERT INTO roles VALUE (default,'${data.title}',${data.salary},${department_id})`, function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    },

    _roleList: function(connection){
        return new Promise(resolve =>{
            connection.query("SELECT title FROM roles", function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    },
    _updateHeirarchy: function(connection,role_id,manager_id){
        return new Promise(resolve =>{
            console.log("Creating new role...\n");
            connection.query(`INSERT INTO heirarchy VALUE ('${role_id}',${manager_id})`, function(err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    }
};

module.exports = roles;