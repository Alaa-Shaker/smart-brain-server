const Clarifai  =require('clarifai');
const app = new Clarifai.App({ apiKey: 'c85c2e9e07624410a16207684934c3a4'});


const imageURLHandlePost = (req,res)=>{
  const {imageURL} = req.body ;
  app.models.predict("a403429f2ddf4b49b307e318f00e528b", imageURL)
  .then(data =>{res.json(data) ; })
  .catch(err => res.status(400).json("Error connect to Clarifai !!!"))

}

const imageHandlePut = (req,res,knex)=>{

	const {id}=req.body;

   knex('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entrs=>{ 
  				if(entrs.length){res.json(entrs[0])}
  				else{res.status(400).json("Can not Get account !!!! ")} 
  			})
  .catch(err=> res.status(400).json('Error connect !!!'))

}

module.exports=({imageHandlePut:imageHandlePut,
                imageURLHandlePost : imageURLHandlePost});