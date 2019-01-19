module.exports=function(data){
	const routerService = data.routerService;
	return{getAll(req, res){
		routerService.getAllRouters().then(function(routers){
			res.render('routers',{result: routers})
			})
	}}
}