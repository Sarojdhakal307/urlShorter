const express = require('express');
const app = express();
const PORT = 4040;

const {connectMongodb } = require('./connection');
// const {handleUserSignup} = require('./controllers/user');
// const {handleUserLogin} = require('./controllers/user');
const urlsDB = require('./models/urlsDB');
const  userDb = require('./models/userDb');

const cookies = require('cookie-parser');
app.use(cookies());

const {onlylogin} = require('./middlewares/auth');

connectMongodb("mongodb://127.0.0.1:27017/shorturl")
.then(()=> console.log('mongodb connection : successful'));
// urlsDB.createCollection().then(()=> console.log('collection created'));
const homeroutes = require('./routes/urls');
const signuproutes = require('./routes/user');
const loginRoutes = require('./routes/login');

const staticrouters = require('./routes/staticRoutrt');
// app.use(express.json());


app.use('/',staticrouters);

app.use('/urls',onlylogin,homeroutes);
app.use('/signup',signuproutes);
app.use('/login',loginRoutes);





app.listen(PORT, () => {
    console.log('surver started on Port : ' + PORT)});