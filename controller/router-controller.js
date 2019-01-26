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
		},
		createGet(req, res){
			res.render ('add');
			
		},
		createPost(req, res){
			console.log(req.body)
			const name = req.body.name;
			const tag = req.body.tag;
			const frequency = req.body.frequency;
			const standart = req.body.standart;
			const range = req.body.range;
			const ports = req.body.ports;
			const vlan = req.body.vlan;
			const antennas = req.body.antennas;
			const manageability = req.body.manageability;
			const fans = req.body.fans;
			const power = req.body.power;
			const plug = req.body.plug;
			const price = req.body.price;

			req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('tag', 'Tag is required').notEmpty();
			req.checkBody('frequency', 'Frequency is not valid').notEmpty();
			req.checkBody('standart', 'Standart is required').notEmpty();
			req.checkBody('range', 'Range is required').notEmpty();
			req.checkBody('ports', 'Ports are required').notEmpty();
			req.checkBody('antennas', 'Antennas are not valid').notEmpty();
			req.checkBody('manageability', 'Manageability is not valid').notEmpty();
			req.checkBody('price', 'Price does not match').notEmpty();
			let errors = req.validationErrors();
			if (errors){
			res.render('add',{
					errors:errors
				})
				return}

			routerService.create({name, tag, frequency, standart, range, ports, vlan, antennas, manageability, fans, power, plug, price}).then(function(entry){
				res.json({ success: true, entry});
			})
		},
		delete(req, res){
			console.log (req.params.id)
			routerService.delete(req.params.id).then(function(){
				res.redirect('/routers')
			})
		},
		editGet(req, res){
			routerService.getById(req.params.id).then(function(router){
				res.render('edit',{router})
			})
		},
		editPost(req, res){
			console.log(req.body)
			const name = req.body.name;
			const tag = req.body.tag;
			const frequency = req.body.frequency;
			const standart = req.body.standart;
			const range = req.body.range;
			const ports = req.body.ports;
			const vlan = req.body.vlan;
			const antennas = req.body.antennas;
			const manageability = req.body.manageability;
			const fans = req.body.fans;
			const power = req.body.power;
			const plug = req.body.plug;
			const price = req.body.price;
			const id = req.body.id

			req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('tag', 'Tag is required').notEmpty();
			req.checkBody('frequency', 'Frequency is not valid').notEmpty();
			req.checkBody('standart', 'Standart is required').notEmpty();
			req.checkBody('range', 'Range is required').notEmpty();
			req.checkBody('ports', 'Ports are required').notEmpty();
			req.checkBody('antennas', 'Antennas are not valid').notEmpty();
			req.checkBody('manageability', 'Manageability is not valid').notEmpty();
			req.checkBody('price', 'Price does not match').notEmpty();
			let errors = req.validationErrors();
			if (errors){
			res.render('edit',{
					errors:errors, router:{id, name, tag, frequency, standart, range, ports, vlan, antennas, manageability, fans, power, plug, price}
				})
				return}

			routerService.edit(id,{name, tag, frequency, standart, range, ports, vlan, antennas, manageability, fans, power, plug, price}).then(function(router){
				res.redirect('/routers')
			})
		}
	}
}