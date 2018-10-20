var mongoose = require('mongoose');
var mongoDB = 'mongodb://balwantjassal:1saphana@ds035498.mlab.com:35498/balwant_db';
mongoose.connect(mongoDB,{ useNewUrlParser: true ,  useCreateIndex: true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    message:{
        type:String,
        unique:true,
        required:true,
        trim:true
    }

});
var UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    }
});
UserSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};
var Contact = mongoose.model("Contact",ContactSchema);
var User = mongoose.model("User",UserSchema);
module.exports = [ Contact, User ];