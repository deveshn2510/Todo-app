const express = require("express");
const app = express();
const fs = require("fs");
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb+srv://dbUserDevesh:Devesh%402510@cluster0-aft2c.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const database = "todos-db";
app.use(express.json());
mongoClient.connect(connectionUrl, { useNewUrlParser: true }, { useUnifiedTopology: true }, function (err, client) {
    if (err) {
        console.log(err);
    }
    const db = client.db(database);
    // db.collection("user").insertOne(
    //     {
    //         "name": "Devesh",
    //         "city": "greater noida"
    //     }
    // )
    // db.collection("user").find({}).toArray(function (err, data) {
    //     console.log(data);
    // })
    console.log("running !!!!!!!!!");
    app.post("/todo", function (req, res) {
        const body = req.body
        //console.log(body)
        db.collection("user").insertOne(body).then(result => {
            //console.log(result);
            res.send(result);
        })
        
    })
    app.get("/todo", function (req , res){
        db.collection("user").find({}).toArray().then(result => 
            {
                //console.log("inside get todo" , result)
                res.send(result)
            }
            //res.send(result)
            )
        
       // return result
    })
})
app.get('/', function (req, res) {
    fs.readFile("src/index.html", function (err, data) { res.send(data.toString()) })
})
app.get('/api/todos', function (req, res) {
    fs.readFile("todos.json", function (err, data) {
        res.send(data.toString());
    })
    //db.collection("user").find({}).toArray().then(result => console.log(result))
})
app.get('/api/todos/add', function (req, res) {
    console.log(req.query);
    if (req.query.todoName != "") {
        var todoName = req.query.todoName;
        console.log("Got new todo data ");
        console.log(todoName);
        fs.readFile("todos.json", function (err, todosData) {
            var todoListData = JSON.parse(todosData);
            console.log(todoListData);
            todoListData.data.push({ "title": todoName, "checked": false });
            fs.writeFile("todos.json", JSON.stringify(todoListData), function (err, data) {
                res.send("Data added");
            })
        })
    } else
        res.send("Failure");
})
 /*   app.post("/todo/check", function (req, res) {
        const body = req.body
        //console.log(body)
        db.collection("user").update(
            {checked : "false"} , 
            {
                checked : "true"
            } ,
            {upsert : true}).then(result => {
            //console.log(result);
            res.send(result);
        })
        
    })
*/
    fs.readFile("src/todos.json", function (err, todosData) {
        var todoListData = JSON.parse(todosData);
        console.log(todoListData);
        for (var i = 0; i < todoListData.data.length; i++) {
            if (todoListData.data[i].title == "buy Milk") {
                if (todoListData.data[i].checked == true) {
                    todoListData.data[i].checked = false;
                } else {
                    todoListData.data[i].checked = true;
                }
            }
        }
        console.log(todoListData);
      //  fs.writeFile("todos.json", JSON.stringify(todoListData), function (err, data) {
        //    res.send("Data added");
        //})
    })
app.listen(process.env.PORT || 3000, () => {
    console.log("Server Starter");
})