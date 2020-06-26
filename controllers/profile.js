const profileHandlePost =(req,res,knex)=>{

	const {id}=req.params;

	knex('users').where({id: id}).select('*')

	.then(user=> { 
		if(user.length>0){res.json(user[0])}
		else { res.json("Not Found")}
		 })
	.catch(err=> res.json("O_o Error connection !!!!"))

}

module.exports=({profileHandlePost:profileHandlePost});