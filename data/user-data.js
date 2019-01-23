module.exports = function (models) {
	const User = models.User;

	return {
		register(user) {
			let newUser = new User({
				name: user.name,
				username: user.username,
				email: user.email,
				hash: user.hash,
				salt: user.salt
			});

			return new Promise(function (resolve, reject) {
				newUser.save(function (err, entry, numaffected) {
					if(err){
						reject(err);
					}

					resolve(entry);
				});
			});
		}
	}
}