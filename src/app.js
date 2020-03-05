const express = require("express");
const app = express();
const fs = require("fs");


app.get('/', function (req, res) {
    fs.readFile("index.html", function (err, data) { res.send(data.toString()) })
})

app.get('/api/todos',function(req, res){
    fs.readFile("todos.json", function(err,data){
        res.send(data.toString());
    })
})

app.get('/api/todos/add', function (req, res) {
    
    console.log(req.query);
    if(req.query.todoName != ""){
        var todoName= req.query.todoName;
        console.log("Got new todo data ");
        console.log(todoName);
        fs.readFile("todos.json", function(err, todosData){
            var todoListData = JSON.parse(todosData);
            console.log(todoListData);
            todoListData.data.push({"title":todoName , "checked":false});
            fs.writeFile("todos.json", JSON.stringify(todoListData), function(err , data){
                res.send("Data added");
            })
        })
    }else
    res.send("Failure");
})

app.get("/api/todos/checkbox" , function(req , res){
    fs.readFile("todos.json", function(err , todosData){
        var todoListData= JSON.parse(todosData);
        console.log(todoListData);
        for(var i=0;i<todoListData.data.length;i++){
            if(todoListData.data[i].title=="buy Milk"){
                if(todoListData.data[i].checked==true){
                    todoListData.data[i].checked=false;
                }else{
                    todoListData.data[i].checked=true;
                }
            }
        }
        console.log(todoListData);
        fs.writeFile("todos.json", JSON.stringify(todoListData), function(err , data){
            res.send("Data added");
        })
        
    })
})

app.listen(process.env.PORT||3000 , () => {
    console.log("Server Starter");
})