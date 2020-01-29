'use strict'
var app = require('./app'),
	server = app.listen(app.get('port'), ()=>{
		console.log(`iniciando en el puerto ${app.get('port')}`)
	})