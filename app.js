const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');


mongoose.connect('mongodb://localhost/stock');
let db = mongoose.connection;

db.on('error', function (err) {
	console.log(err)
});
db.on('open', function () {
	console.log('Connected to MongoDB')
});

const models = require('./models')(fs, mongoose);
const data = require('./data')(fs, models);
const controllers = require('./controller')(fs, data);

// Init App
const app = express();
app.use(express.static("public"));

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get('/', function (req, res) {
	res.render('index', {
		result: {
			ar: [1, 2, 3], name: "Pesho"
		}
	});
});

// Add Route
app.get('/tplink', function (req, res) {
	res.render('tplink', {
		title: 'tplink'
	});
});

app.get('/routers', controllers.routerController.getAll)
app.get('/routers/search/:pattern',controllers.routerController.search)
//

app.get('/register', controllers.userController.registerGet);
app.post('/register', controllers.userController.registerPost)


// app.use('/user-controller.js', users);

// Start Server
app.listen(3000, function () {
	console.log('Application running at port 3000...')
});
