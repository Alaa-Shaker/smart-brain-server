

const signInHandlePost=(req,res,knex,bcrypt)=>{
	const { email , password} =req.body;
	if(email && password)
	{
		knex.select('email','hash')
		.where('email','=',email)
		.from('login')
		.then(data=> {
			isValid=bcrypt.compareSync(password, data[0].hash);

			if(isValid){ 
						knex.select('*')
						.from('users')
						.where('email','=',email)
						.then(user=>res.json(user[0]))
					}

			else { res.status(400).json("email or password wrong")}
		})
		.catch(err=> res.status(400).json("email or password wrong") )
	}
	else{
		res.status(400).json("O_o some thing empty !!!");
	}
}

module.exports=({signInHandlePost:signInHandlePost});