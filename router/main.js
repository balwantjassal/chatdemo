
var Contact = require("./../models/Schema");

module.exports = function(app){
    app.get("/",(req,res)=>{
        res.render("index.html");
    });
    app.get("/about",(req,res)=>{
        res.render("about.html");
    });
    app.get("/contact",(req,res)=>{
        if(data){
            res.render("contact.html",{"ContactDetails":data});
        }else{
            res.render("contact.html");
        }
    });
    app.get("/chat",(req,res)=>{
        res.render("chat.html");
    });
   app.post("/",(req,res)=>{
    res.send(req.body.comment);
   });
   app.post("/contact",(req,res)=>{

     var data = {name:req.body.name,email:req.body.email,message:req.body.message};
     Contact.create(data,function(err, record){
         if(err) throw err;
         res.send("Testing Data:"+record); 

     });
       
   });
    
}
