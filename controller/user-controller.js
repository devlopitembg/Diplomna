const express = require('express');
const router = express.Router();

//Bringing the User Model
let User = require('../data/user-data.js');

//Register Form
router.get('/register', function(req, res){
	res.render('register');
})

module.exports = router;