module.exports = function(mongoose){

	//Router Schema
const routerModelSchema = {
	name:String,
	tag:String,
	frequency:String,
	standart:String,
	range:String,
	ports:String,
	vlan:Number,
	antennas:String,
	manageability:String,
	fans:String,
	power:String,
	plug:String,
	price:Number,
	datecreated:Date,
	

}

const routerModelName = 'router'
return mongoose.model(routerModelName, routerModelSchema);
}