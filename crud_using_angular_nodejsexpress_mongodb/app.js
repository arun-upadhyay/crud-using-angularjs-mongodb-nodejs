var express = require('express');
var bodyParser = require('body-parser');
//var multer = require('multer');
//var fs = require('fs');
//var upload = multer(); 
var app = express();

//app.use(express.static(__dirname + '/client/views'));

//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  // res.render("index.html");
  res.sendfile(__dirname+'/client/views/index.html');
})
app.use('/js', express.static(__dirname + '/client/js' ));
var server = app.listen(8090, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})