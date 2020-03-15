const express = require("express");
const app = express();
const fs = require("fs");
const mongodb = require('mongodb');
const ObjectId = require("mongodb").ObjectID;
const mongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb+srv://dbUserDevesh:Devesh%402510@cluster0-aft2c.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const database = "todos-db";
app.use(express.json());
mongoClient.connect(connectionUrl, { useNewUrlParser: true }, { useUnifiedTopology: true }, function (err, client) {
    if (err) {
        console.log(err);
    }
    const db = client.db(database);
    console.log("running !!!!!!!!!");

    //Adding 
    app.post("/todo", function (req, res) {
        const body = req.body
        db.collection("user").insertOne(body).then(result => {
            res.send(result);
        })

    })

    //Display
    app.get("/todo", function (req, res) {
        db.collection("user").find({}).toArray().then(result => {
            res.send(result)
        }
        )

    })

    //Update
    app.get("/update", function (req, res) {
        var val = req.query.updatedval;
        
        console.log(req.query);

        var id = req.query.id


        db.collection("user").updateOne({ "_id": ObjectId(id) }, { $set: { "task": val } }, function (err, res) {
            if (err)
                console.log(err)
            else
                console.log(`${ObjectId(id)}  ${val}`)
        })


        res.send("done");

    })

    //Checked-update
    app.get("/checked", function (req, res) {
        var val = req.query.updatedval;
        console.log(req.query);
        var boolVal= JSON.parse(val);
        var id = req.query.id

        db.collection("user").updateOne({ "_id": ObjectId(id) }, { $set: { "checked": boolVal } }, function (err, res) {
            if (err)
                console.log(err)
            else
                console.log(`${ObjectId(id)}  ${val}`)
        })


        res.send("done");

    })

    //Delete
    app.get("/delete", function (req, res) {
        var id = req.query.id;
        db.collection("user").remove({ "_id": ObjectId(id) }, function (err, res) {
            if (err)
                console.log(err);
        })
    })

})
app.get('/', function (req, res) {
    fs.readFile("src/index.html", function (err, data) { res.send(data.toString()) })
})
app.get('/api/todos', function (req, res) {
    fs.readFile("todos.json", function (err, data) {
        res.send(data.toString());
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Starter");
})