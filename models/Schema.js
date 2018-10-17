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
var Contact = mongoose.model("Contact",ContactSchema);
module.exports = Contact;