//User REST API
exports.insert = function(app,db){
    app.post("/api/insertUser", (req, res) => {
        
        
        var Enteredpassword = req.body.password;
        var uname = req.body.username;
        var enteredRole = req.body.role
        var duplicate = false;

        userObj = {username: uname, password: Enteredpassword, role: enteredRole}
        
        
        console.log(userObj);
        var query = {username: uname};

        const collection = db.collection('users');
        //check for duplicate usernames 
        collection.find(query).toArray((err, count)=>{
        if(count != 0){
            duplicate = true;
            console.log('username already used')
        }

        if (!duplicate){
        //if no duplicate 
        collection.insertOne(userObj, (err, result)=>{
        if (err) throw err;
        
        //send back to client true to indicate user has been inserted
        res.send(true);
        })
        }else{
        //On Error send back false 
        res.send(false);
        }
    });
});

    }

exports.delete = function (app,db) {


    /* Deleting a user from the database. */
    app.post("/api/deleteUser", (req, res) => {
        var user = req.body.username
        
        console.log(user);
        console.log("removing user: ", user);
        db.collection("users").deleteOne({username : user}, function(err) {
            if (err) throw err;
            res.send(true);
            console.log("user removed")
            
        });
    });
    }

exports.find = function (app,db) {

    /* This is a find request to the server. It is getting users from the database and storing into array. */
    app.get('/api/getUsers', (req, res) => {
        var query = {};
        db.collection('users').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        });
    });
    

    }

//need to add edit feature

exports.update = function(app,db)
{
    app.post('/api/editUser', (req,res) => {
    var query = req.body.username;
    var newRole = req.body.role;
    console.log(newRole);
    console.log("updating user role: ", req.body.username);
    db.collection('users').updateOne({username: query}, {$set: {role: req.body.role}}, function(err,res){
        if (err) throw err;
        console.log("user role updated");


        
    });
});

}


