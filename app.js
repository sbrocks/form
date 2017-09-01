var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/formdata',function(err,db){
    if(err){
        console.log(err);
    } else {
        console.log('Successfully connected to db');
    }
});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

var user=new mongoose.Schema({
    name:String,
    email:String,
    comment:String
});

var User=mongoose.model('User',user);


app.post('/cldb', function (req, res) {
    var user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.comment=req.body.comment;
    user.save(function(err,userdb){
        if(err){
            console.log(err);
        }else{
            res.send(user);
        }
    });        
});

app.get('/cldb',  function(req, res) {
    User.find({},function(err,users){
        if(err){
            res.send(err);
        }else{
            res.send(users);
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );