module.exports = function(app){
    app.get("/",(req,res)=>{
        res.render("index.html");
    });
    app.get("/about",(req,res)=>{
        res.render("about.html");
    });
    app.get("/contact",(req,res)=>{
        res.render("contact.html");
    });
    app.get("/chat",(req,res)=>{
        res.render("chat.html");
    });
   app.post("/",(req,res)=>{
    res.send(req.body.comment);
   });
    
}
