const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const register =require('./controllers/register');
const signIn =require('./controllers/signIn');
const profile =require('./controllers/profile');
const image =require('./controllers/image');

var cors = require('cors') ;

var knex = require('knex')({
    client: 'pg',
    connection : process.env.DATABASE_URL,
    ssl:true
});

app.use(express.urlencoded({extend:false}));
app.use(express.json());
app.use(cors())



//////////////////////////////

app.get('/',(req,res)=>{
	res.send("It is working ");
})



app.post('/signin',(req,res)=>{signIn.signInHandlePost(req,res,knex,bcrypt)})

app.post('/register',(req,res)=>{register.registerHandlePost(req,res,knex,bcrypt)})

app.post('/profile/:id',(req,res)=>{profile.profileHandlePost(req,res,knex)})

app.put('/image',(req,res)=>{image.imageHandlePut(req,res,knex)})

app.post('/imageURL',(req,res)=>{image.imageURLHandlePost(req,res)})

app.listen(process.env.PORT || 3000,()=>{ console.log(`Server runing on port ${process.env.PORT }`);})