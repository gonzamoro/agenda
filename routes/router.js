'use strict'

var crisolController = require('../controllers/crisol-controller'),
	express = require('express'),
	passport=require('passport'),
	router = express.Router()

	

router
	//LOGIN 
	.get('/', (req, res, next) => res.render('login'))/* vista */
	.post('/login', passport.authenticate('local-signin', { successRedirect: '/profile', failureRedirect: '/', failureFlash: true }))

	//SIGNUP
	.get('/signup', (req, res, next) => res.render('signup'))/* vista */
	.post('/signup', passport.authenticate('local-signup', { successRedirect: '/profile', failureRedirect: 'signup' , failureFlash: true}))

	.get('/logout', (req, res, next)=>{
		req.logout()
		res.redirect('/')
	})


	
	//CRUD

	//clientes
	.get('/profile', isAuthenticated, crisolController.getAll)
	.get('/agregar', crisolController.addForm)
	.post('/', crisolController.save)
	.get('/editar/:nombre', crisolController.getOne)
	.put('/actualizar/:nombre', crisolController.save)
	.delete('/eliminar/:nombre', crisolController.delete)
	.get('/clients', isAuthenticated, crisolController.getAll)

	//proveedores

	.get('/proveedores', isAuthenticated, crisolController.getAll)
	.get('/addprov', crisolController.addForm)
	.get('/editar/prov/:nombre', crisolController.getOne)
	.delete('/eliminar/prov/:nombre', crisolController.delete)

	//.use(crisolController.error404)

	//BUSCAR

	.post('/buscar', isAuthenticated, crisolController.buscar)

	


	
	function isAuthenticated(req,res,next){
		if(req.isAuthenticated()){
			return next()
		}
		res.redirect('/')
	}
	

module.exports = router