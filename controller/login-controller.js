module.exports = function ({ data, bcrypt, expressValidator, passport }) {
	const userService = data.userService;
	return {
		loginGet(req, res) {
			res.render('login');
		},
		loginPost(req, res, next) {
			passport.authenticate('local', function(error, user){
				if (error){
					next (error)
					return
				}
				if (!user){
					res.render('login',{
						errors:[{msg:'Invalid username or password'}]
					})
				}
				req.login(user, function(error){
					if (error){
						next (error)
						return
					}
					res.redirect('/');
				})
			}
			//  {
			// 	succesRedirect: '/',
			// 	failureRedirect: '/login',
			// 	failureFlash: true
			// }
			) (req, res, next);
		}
	}
}
