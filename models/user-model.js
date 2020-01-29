'use strict'

var mongoose = require('mongoose'),
	conf = require('./db-conf'),
	bcrypt = require('bcrypt'),
	Schema = mongoose.Schema,
	saltRounds = 10,

	userSchema = new Schema({
		email : "string",
		password : "string"
	},
	{
		collection : "user"
	}),

	userModel = mongoose.model("User", userSchema)

	/* userSchema.methods.encryptPassword=(password)=>{

		bcrypt.genSalt(saltRounds, (err,salt)=>{
		if (err ) throw err
		bcrypt.hash(password, salt, (err,hash)=>{
			if (err ) throw err
			//console.log(hash)                            
			return hash
		  })
		})
} */
	
/* 
	userSchema.methods.encryptPassword = function (password){
		return bcrypt.genSalt(saltRounds, (err,salt)=>{
			if (err ) throw err
			bcrypt.hash(password, salt, (err,hash)=>{
				if (err ) throw err
				return hash
			})
		})
	}

	userSchema.methods.comparePassword = function(password){
		return bcrypt.compareSync(password, this.password)
	} */

		

mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`, {useMongoClient: true})

module.exports = userModel