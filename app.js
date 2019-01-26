const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const config = require('./config/database')
const passport = require('passport');
const session = require('express-session');

mongoose.connect(config.database);
let db = mongoose.connection;

db.on('error', function (err) {
	console.log(err)
});
db.on('open', function () {
	console.log('Connected to MongoDB')
});

const models = require('./models')(fs, mongoose);
const data = require('./data')(fs, models, mongoose);
const controllers = require('./controller')({ fs, data, bcrypt, passport });

// Init App
const app = express();
app.use(express.static("public"));

app.use(session({
	cookie: { maxAge: 60000 },
	secret: 'woot',
	resave: false,
	saveUninitialized: false
}));

// Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function (param, msg, value) {
		var namespace = param.split('.')
			, root = namespace.shift()
			, formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

app.use(require('connect-flash')());

// Passport Config
require('./config/passport')(passport, models);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get('/', function (req, res) {
	res.render('index', {
		title: 'Home'
	});
});

// Add Route
app.get('/tplink', function (req, res) {
	res.render('tplink', {
		title: 'tplink'
	});
});

//

app.get('/description', function (req, res) {
	res.render('description', {
		title: 'description'
	});
});


//

app.get('/routers', controllers.routerController.getAll)
app.get('/routers/search/:pattern', controllers.routerController.search)

//

app.get('/register', controllers.userController.registerGet);
app.post('/register', controllers.userController.registerPost)

app.get('/login', controllers.loginController.loginGet);
app.post('/login', controllers.loginController.loginPost);

app.get('/add',controllers.routerController.createGet);
app.post('/add', controllers.routerController.createPost)

app.get('/router/delete/:id',controllers.routerController.delete)

app.get('/edit/:id', controllers.routerController.editGet)
app.post('/edit', controllers.routerController.editPost)

// Start Server
app.listen(3000, function () {
	console.log('Application running at port 3000...')
});
