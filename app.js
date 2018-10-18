var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var xdata;
require("./router/main.js")(app);
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message',function(msg){

        console.log(msg);
        
        io.emit('client message', msg);
        setTimeout(function(){
            io.emit('server message', 'Welcome to NodeJS Socket World');
        },2000);
        

    });
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });

  });
  


app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));


http.listen(4000,()=>{
    console.log("Server listen at Port 4000");
});