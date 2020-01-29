'use strict'

var crisolModel = require('../models/crisol-model'),
	url=require('url'),

crisolController = () => {}

crisolController.getAll = (req, res, next) => {
	let userid = req.user.id
	let direction = req.url
	//console.log(url)
	//let urlparsed= url.parse(direction)
	//console.log(urlparsed)
	//console.log(direction)

	
	crisolModel.getAll(userid,direction, (docs) => {
		let locals = {
			data : docs
		}
		if(direction === '/proveedores'){
			return res.json(docs)
		}if(direction === '/clients'){
			return res.json(docs)
		}else{
			return res.render('profile', locals)

		}

		
	
		
	})
}

crisolController.getOne = (req, res, next) => {
	let nombre = req.params.nombre
	let direction = req.url
	console.log(direction)
	let cual = direction.indexOf('prov')
	console.log(cual)
	//console.log(req.event)
	//let body = req.body
	//console.log(body)

	crisolModel.getOne(nombre,direction, (docs) => {
		let locals = {
			title : 'Editar',
			edit:true,
			data : docs
		}

		res.render('editar-cliente', locals)
	})
}

crisolController.save = (req, res, next) => {
	let cliente = {
		id:req.body.id,
		nombre : req.body.nombre,
		direccion : req.body.direccion,
		telefono : req.body.telefono,
		user : req.user.id
	}

	console.log(cliente)

	crisolModel.save( cliente, () => res.redirect('/profile') )
}

crisolController.delete = (req, res, next) => {
	let nombre = req.params.nombre
	let direction = req.url
	console.log(nombre)

	//crisolModel.delete( nombre,direction, () => res.redirect('/profile') )
	crisolModel.delete( nombre,direction, ()=> res.json('hola'))
}

crisolController.addForm = (req, res, next) => {

	//const provider=""
	const direction = req.url
	//direction.toString()
	console.log(direction)
	if(direction === '/addprov?'){
	res.render('agregar-cliente', { title : 'Agregar proveedor', provider:true })
	}else{
	res.render('agregar-cliente', { title : 'Agregar cliente', provider:false })	
	}
}


crisolController.buscar = (req, res, next) => {
	//res.setHeader('Content-Type','text/html')
	let userid = req.user.id
	let value = req.body.data
	let search = req.body.whatsearch

	console.log(userid,search)
	
	crisolModel.buscar(userid,value,search, (docs) => {
		//res.setHeader('Content-Type','application/json')

		const valor = docs
		//console.log(valor)		
		res.json(valor)
		//res.end()

	})
}

crisolController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
}

module.exports = crisolController