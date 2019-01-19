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
		}
	}
}