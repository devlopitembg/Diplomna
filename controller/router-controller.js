module.exports = function ({data}) {
	const routerService = data.routerService;
	return {
		getAll(req, res) {
			let user = req.user;
			console.log(user);
			routerService.getAllRouters().then(function (routers) {
				res.render('routers', { result: routers, user
			})
			})
		}, 
		search(req, res) {
			let pattern = req.params.pattern;
			routerService.searchByName(pattern).then(function (routers) {
				res.json({ success: true, routers });
			})
		}
	}
}