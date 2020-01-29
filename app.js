'use strict'

var express = require('express'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	restFull = require('express-method-override')('_method'),
	routes = require('./routes/router'),
	passport = require('passport'),
	flash = require('connect-flash'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	faviconURL = `${__dirname}/public/img/favicon.png`,
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	port = (process.env.PORT || 3001),
	app = express()

	require('./passport')

app
	.set('views', viewDir)
	.set('view engine', 'jade')
	.set('port', port)
	
	.use(favicon(faviconURL))
	.use( bodyParser.json() )
	.use( bodyParser.urlencoded({extended:false}) )
	.use( cookieParser())
	.use(restFull)
	.use(session({
		secret: 'appcontactos',
		resave: false,
		saveUninitialized:false
	}))
	.use(passport.initialize())
	.use(passport.session())
	.use(morgan('dev'))
	.use(express.urlencoded({extended:false}))
	.use(express.json())
	.use(flash())
	.use(publicDir)
	//ejecuto el middleware enrutador
	.use((req, res, next) => {
	app.locals.signinMessage = req.flash('signinMessage');
	app.locals.signupMessage = req.flash('signupMessage');
	app.locals.user = req.user;
	//console.log(app.locals)
	next();
  })
	.use(routes)/*aca en vez de especificar una sola ruta(.use('/', routes)), le digo que escuche routes*/
/*	.use(contacto)*/


module.exports = app