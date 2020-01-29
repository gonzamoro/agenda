'use strict'

var mongoose = require('mongoose'),
	conf = require('./db-conf'),
	Schema = mongoose.Schema,

	clientsSchema = new Schema({
		nombre : "string",
		direccion : "string",
		telefono : "string",
		user: "string"
	},
	{
		collection : "client"
	}),


	clientsModel = mongoose.model("Cliente", clientsSchema)


		

mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`, {useMongoClient: true})

module.exports = clientsModel