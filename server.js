const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const register =require('./controllers/register');
const signIn =require('./controllers/signIn');
const profile =require('./controllers/profile');
const image =require('./controllers/image');

var cors = require('cors') ;

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'alaa',
    password : '1234',
    database : 'smart'
  }
});

app.use(express.urlencoded({extend:false}));
app.use(express.json());
app.use(cors())



const saltRounds = 10;

const database={users:[
	{
		id :0,
		name :'Alaa',
		email:'alaa@gmail.com',
		password:'1234',
		entries: 0,
		joined: new Date()
	} ,
	{
		id :1,
		name :'Mais',
		email:'mais@gmail.com',
		password:'1234',
		entries: 0,
		joined: new Date()

	} ]};


//////////////////////////////

app.get('/',(req,res)=>{
	res.send("It is working ");
})



app.post('/signin',(req,res)=>{signIn.signInHandlePost(req,res,knex,bcrypt)})

app.post('/register',(req,res)=>{register.registerHandlePost(req,res,knex,bcrypt,saltRounds)})

app.post('/profile/:id',(req,res)=>{profile.profileHandlePost(req,res,knex)})

app.put('/image',(req,res)=>{image.imageHandlePut(req,res,knex)})

app.post('/imageURL',(req,res)=>{image.imageURLHandlePost(req,res)})

app.listen(process.env.PORT || 3000,()=>{ console.log(`Server runing on port ${process.env.PORT }`);})