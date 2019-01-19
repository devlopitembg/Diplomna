module.exports = function(mongoose){

	//Router Schema
const routerModelSchema = {
	name:String,
	price:Number,
	datecreated:Date,
	frequency:String,

}

const routerModelName = 'router'
return mongoose.model(routerModelName, routerModelSchema);
}