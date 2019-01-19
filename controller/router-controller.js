module.exports = function (data) {
	const routerService = data.routerService;
	return {
		getAll(req, res) {
			routerService.getAllRouters().then(function (routers) {
				res.render('routers', { result: routers })
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