const fs=require('fs')
const express=require('express')
const app=express()
app.get('/',function(req,res){
    fs.readFile("todo/index.html",function(err,data){
       console.log(err);
        res.send(data.toString());
    })
});
app.get('/todo',function(req,resp){
    fs.readFile("todo/index.json",function(err,data){
        resp.send(data.toString())
    });
})
app.get('/todo/add',function(req,resp){
    var id=Math.floor(Math.random()*100);
    console.log(req.query);
    if(typeof(req.query.todoname)!=undefined && req.query.todoname!=""){
        var todoname=req.query.todoname;
        console.log(todoname);
    }
    fs.readFile("todo/index.json",function(er,tododata){
       var todolistdata=JSON.parse(tododata);
       //todolistdata=todolistdata.task;
       // console.log(todolistdata);
       todolistdata.task.push({"title":todoname,"checked":false,"idt":id});
        fs.writeFile("todo/index.json",JSON.stringify(todolistdata),function(err){
           // console.log(err);
        });
        resp.send(id.toString());
    });
})
app.get('/todo/ref',function(req,resp){
    var idc=req.query.id;
    fs.readFile("todo/index.json",function(err,data){
    var todolistdata=JSON.parse(data);
    //console.log(todolistdata);
    var list=todolistdata.task;
    for(var i=0;i<list.length;i++){
        if(list[i].idt==idc)
        {
            if(list[i].checked==true)
            list[i].checked=false;
            else
            list[i].checked=true;
            resp.send(list[i].checked.toString())
        }
    }
    fs.writeFile("todo/index.json",JSON.stringify(todolistdata),function(err){
        console.log(err);
    });
    })
})
app.listen(3000,function(){
    console.log("servers started");
})