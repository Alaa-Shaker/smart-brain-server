

const registerHandlePost= (req,res,knex,bcrypt)=>{

	const {name,email,password} = req.body;

	const hash = bcrypt.hashSync(password);
	if(name && password && email)
	{
		knex.transaction(trx=> {
			trx.insert({email:email,
						hash : hash})
						.into('login')
						.returning('email')
						.then(loginEmail=>{
							return trx('users')
							.insert({
									name:name,
									email:loginEmail[0] ,
									joined:new Date()	})
							.returning('*')
							.then(user=>{
									    if(user.length){ res.json(user[0])}
										else{res.status(400).json("O_o ops !!")}
										}
								)
						})
					    .then(trx.commit)
					    .catch(trx.rollback)
					}) 
		 .catch(err=>res.status(400).json("O_o Can not Add !!"))
		}
		else{
			res.status(400).json("O_o some thing empty !!! ");
		}
	}

module.exports=({registerHandlePost:registerHandlePost});