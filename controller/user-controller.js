// const express = require('express');
// const router = express.Router();

// //Bringing the User Model
// let User = require('../data/user-data.js');

// //Register Form
// router.get('/register', function (req, res) {
// 	res.render('register');
// })

module.exports = function (data) {
	const userService = data.userService;

	return {
		registerGet(req, res) {
			res.render('register');
		},
		registerPost(req, res) {
			// validation
			userService.register(req.body).then(function (registeredUser) {
				res.json({ success: true, message: 'user registered successful', registeredUser })
			}, function (error) {
				// show/log error
			});
		}
	}
}