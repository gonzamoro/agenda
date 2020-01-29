'use strict'

var conn = require('./client-model-connection'),
	ProvidersModel = require('./proveedor-model'),
	

	crisolModel = () => {}


crisolModel.getAll = (userid,direction,cb) => {
	direction.toString()
	//console.log(ff)
	//const ff = '5dba362d7d95d2062c6c73ab'
	if(direction === '/proveedores'){
	ProvidersModel
		.find({user:userid})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)		
		})		
	}else{
	conn
		.find({user:userid})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)				
		})

	}
}

crisolModel.getOne = (id,direction, cb) => {

	if(direction.indexOf('prov') == -1){
	conn
		.findOne({nombre : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
	}else{
	ProvidersModel
		.findOne({nombre : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})		
	}
}

crisolModel.save = (data, cb) => {

	if(data.direccion){
	conn
		.count({_id : data.id})
		.exec((err, count) => {
			if(err) throw err
			console.log(`Número de Docs: ${count}`)

			if(count == 0)
			{
				conn.create(data, (err) => {
					if(err) throw err
					cb()
				})
			}
			else if(count == 1)
			{
				conn.findOneAndUpdate(
					{_id : data.id},
					{
						nombre : data.nombre,
						direccion : data.direccion,
						telefono : data.telefono
					},
					(err) => {
						if(err) throw(err)
						cb()
					}
				)
			}
		})
	}else{
		ProvidersModel
		.count({_id : data.id})
		.exec((err, count) => {
			if(err) throw err
			console.log(`Número de Docs: ${count}`)

			if(count == 0)
			{
				ProvidersModel.create(data, (err) => {
					if(err) throw err
					cb()
				})
			}
			else if(count == 1)
			{
				ProvidersModel.findOneAndUpdate(
					{_id : data.id},
					{
						nombre : data.nombre,						
						telefono : data.telefono
					},
					(err) => {
						if(err) throw(err)
						cb()
					}
				)
			}
		})
	}
}

crisolModel.delete = (id, direction,cb) => {
	
	if(direction.indexOf('prov') == -1){
	conn.remove({nombre : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
	}else{
	ProvidersModel.remove({nombre : id}, (err, docs) => {
		if(err) throw err
		cb()
	})		
	}
}

crisolModel.buscar = (userid,value,search,cb) => {
	//console.log(value)
if(!search===true){
	conn
		//.find({user:userid})
		//.find({nombre:value})
		.find({
			//nombre:{ $regex:value},
			$or: [ { nombre: {$regex:value} }, { direccion: {$regex:value} } ] ,
			user:userid
		})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)			
		})
	}else{
	
	ProvidersModel		
		//.find({user:userid})
		//.find({nombre:value})
		.find({
			nombre:{ $regex:value},
			user:userid
		})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
	})
}	
}
	

module.exports = crisolModel