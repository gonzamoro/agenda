'use strict'

var mongoose = require('mongoose'),
	conf = require('./db-conf'),
	Schema = mongoose.Schema,

	ProvidersSchema = new Schema({
		nombre : "string",
		telefono : "string",
		user: "string"
	},
	{
		collection : "providers"
	}),


	ProvidersModel = mongoose.model("Provider", ProvidersSchema)


		

mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`, {useMongoClient: true})

module.exports = ProvidersModel