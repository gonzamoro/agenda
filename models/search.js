var conn = require('./client-model-connection')


buscar = (req,res,next) => {
	//console.log(value)

	conn
		//.find({user:userid})
		.find({nombre:value})
		.exec((err, docs) => {
            if(err) throw err
            console.log(docs)
        res.json(docs)
        next()


			
		})
}
buscar()


