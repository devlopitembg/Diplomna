module.exports = function (data) {
	const userService = data.userService;

	return {
		loginGet(req, res) {
			res.render('login');
        }
    }
}