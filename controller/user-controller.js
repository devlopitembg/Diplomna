// const express = require('express');
// const router = express.Router();

// //Bringing the User Model
// let User = require('../data/user-data.js');

// //Register Form
// router.get('/register', function (req, res) {
// 	res.render('register');
// })

module.exports = function ({data, bcrypt}) {
	const userService = data.userService;
	return {
		registerGet(req, res) {
			res.render('register');
		},
		registerPost(req, res) {
			// validation
			const name = req.body.name;
			const email = req.body.email;
			const username = req.body.username;
			const password = req.body.password;

			req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('email', 'Email is required').notEmpty();
			req.checkBody('email', 'Email is not valid').isEmail();
			req.checkBody('username', 'Username is required').notEmpty();
			req.checkBody('password', 'Password is required').notEmpty();
			req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);
			let errors = req.validationErrors();
			if (errors){
				res.render('register',{
					errors:errors
				})
				return
			}
			// hash
			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(password, salt, function(err, hash){
					if(err){
						console.log(err);
					} 
					let User = {name, email, username, hash, salt}
					userService.register(User).then(function (registeredUser) {
						res.json({ success: true, message: 'User registration successful', registeredUser })
					}, function (error) {
				});
			})
			});
		}
	}
}