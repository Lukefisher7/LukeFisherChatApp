const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const https = require("https");
const fs = require("fs");
const PORT = 3000;
const io = require('socket.io')(http, {
  cors: {
    origins: 'http://localhost:4200',
    methods: ["GET", "POST"],
  }
});

//socket initialisation//
const sockets = require("./socket.js");
const server = require("./listen.js");
const userfile = require('./data/user.json');

//parse requests
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// respond with "server page: hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  console.log("Server is running at port", PORT);
  res.send("Server Page: Hello World");
});

//require('./listen.js')(http);


//mongoDB setup and database operations declared
var mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
const url = 'mongodb://localhost:27017';
const userRoute = require('./routes/UserOperations')
const groupRoute = require('./routes/GroupOperations')
const channelRoute = require('./routes/ChannelOperations')
const chatHistRoute = require('./routes/HistoryOperations')
const loginRoute = require('./data/login');
MongoClient.connect(url, {family:4}, function(err, client){
  if (err) {return console.log(err)}
      const dbName = 'chatappDB';
      const db = client.db(dbName);
      console.log("database created")
 
      db.createCollection('users', function(err, res) {
          if (err) throw err;
          console.log("users Collection created!");})

      db.createCollection('groups', function(err, res) {
          if (err) throw err;
          console.log("groups Collection created!");})

      db.createCollection('channels', function(err, res) {
          if (err) throw err;
          console.log("channels Collection created!");})


      db.createCollection('chatHistory', function(err, res) {
          if (err) throw err;
          console.log("chat history Collection created!");})

          db.collection("users").insertMany(userfile, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
          });

      //user operations routes //
     userRoute.insert(app,db);
     userRoute.delete(app,db);
     userRoute.find(app,db);
    userRoute.update(app, db); 
    


      //group operations routes //
      groupRoute.delete(app,db);
      groupRoute.insert(app,db);
      groupRoute.list(app,db);


      //channel operations routes//
      channelRoute.insert(app,db);
      channelRoute.delete(app,db);
      channelRoute.find(app,db);

      //chat history routes//
      chatHistRoute.delete(app, db);
      chatHistRoute.find(app,db);
      chatHistRoute.insert(app,db);
    


      //user authentication using mongodb//
     loginRoute(app,db);

 
})

