const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');


mongoose.connect('mongodb://localhost/stock');
let db = mongoose.connection;

db.on ('error', function(err) {
	console.log(err)});
db.on ('open', function() {
	console.log('Connected to MongoDB')
});


let models = {Router:require('./models/router-models.js')(mongoose)};
let routerService = require ('./data/router-data.js')(models);
const data = {routerService}
const routerController = require('./controller/router-controller.js')(data)

// Init App
const app = express();
app.use(express.static("public"));

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
  res.render('index', {
  	result: {ar: [1,2,3], name: "Pesho"
  }});
});

// Add Route
app.get('/tplink', function(req, res){
	res.render('tplink', {
		title:'tplink'
	});
});

app.get('/routers',routerController.getAll)
app.get('/routers/:name',function(req, res){
	console.log(req.params.name)
	//!
	return
})
//

let users = require('./controller/user-controller.js');
app.use('/user-controller.js', users);

// Start Server
app.listen(3000, function(){
  console.log('Application running at port 3000...')
});
