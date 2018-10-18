var express = require('express');
var app = express();
var Contact = require("./../models/Schema");
app.set('view engine', 'ejs')
module.exports = function(app){
    app.get("/",(req,res)=>{
        res.render("index");
    });
    app.get("/about",(req,res)=>{
        res.render("about");
    });
    app.get("/contact",(req,res)=>{
        Contact.find({},{},function(err,docs){
            res.render("contact",{contacts:docs});
         });
           // res.render("contact.html");
      
    });
    app.get("/chat",(req,res)=>{
        res.render("chat");
    });
   app.post("/",(req,res)=>{
    res.send(req.body.comment);
   });
   app.post("/contact",(req,res)=>{

     var data = {name:req.body.name,email:req.body.email,message:req.body.message};
     Contact.create(data,function(err, record){
         if(err) throw err;
         Contact.find({},{},function(err,docs){
            res.render("contact",{contacts:docs});
         });

     });
    
    
   });
    
}
