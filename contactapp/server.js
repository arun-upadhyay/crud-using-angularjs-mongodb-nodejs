var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('dbs', ['contactlist']);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


// get all contact lists
app.get('/contact-list', function(req, res){
	db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  	});

});
//save new contact
app.post('/save-contact', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });

});
// delete existing contact 
app.delete('/delete-contact/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

// edit exiting contact
app.get('/edit-contact/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});


// saved updated contact
app.put('/update-save/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.listen(3000);
console.log("Server running in the port 3000");