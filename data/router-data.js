//var router1 = new Router ({name:'router1',price:20,datecreated:new Date(2018,5,3),frequency:'2.4,5.0'});
//router1.save(function(err, entry, numaffected){console.log(err, entry, numaffected)});
//db.close()


module.exports = function (models) {
	const Router = models.Router

	//Asinhronno

	return {
		getAllRouters() {
			return new Promise(function (resolve, reject) {

				Router.find(function (err, routers) {
					if (err) { reject(err) }
					resolve(routers)
				})
			})
		},
		searchByName(pattern) {
			let regex = new RegExp(pattern, 'i');

			return new Promise(function (resolve, reject) {
				Router.find({ 'name': regex }, function (err, routers) {
					if (err) { reject(err) }
					resolve(routers)
				})
			})
		},
		create(router) {
			var router1 = new Router(router);
			return new Promise(function(resolve, reject){
			router1.save(function (err, entry, numaffected) {
				if (err) { reject(err) }
					resolve(entry)
			});
		})
		},
		delete(id) {
			return new Promise(function (resolve, reject) {
				Router.deleteOne({ '_id': id}, function (err, b) {
					if (err) { reject(err) }
					resolve()
				})
			})
		},
		edit(id, router) {
			console.log(router)
			return new Promise(function(resolve, reject){
			Router.updateOne({ '_id': id}, router, function (err, res) {
				console.log(err, res)
				if (err) { reject(err) }
					resolve(res)
				})
			})
		},
		getById(id){
			return new Promise(function(resolve, reject){
			Router.findById(id,function(err, res){
				if(err){reject(err)}
				resolve(res)
				
			})
			})
		},
		searchByName(pattern) {
			let regex = new RegExp(pattern, 'i');

			return new Promise(function (resolve, reject) {
				Router.find({ 'tag': regex }, function (err, routers) {
					if (err) { reject(err) }
					resolve(routers)
				})
			})
		}
	}
}