var express = require("express");
var app = express();
var session = require('express-session');
app.use(session({
    secret: 'somekey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
var http = require("http").Server(app);
var io = require('socket.io')(http);
var User = require("./models/Schema")[1];
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  app.use(passport.initialize());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var Contact = require("./models/Schema");


var xdata;
require("./router/main.js")(app,passport);
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