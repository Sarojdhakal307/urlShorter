const express = require('express');
const app = express();
const PORT = 4040;

const {connectMongodb } = require('./connection');
const urlsDB = require('./models/urlsDB');

connectMongodb("mongodb://127.0.0.1:27017/shorturl")
.then(()=> console.log('mongodb connection : successful'));
// urlsDB.createCollection().then(()=> console.log('collection created'));
const homeroutes = require('./routes/urls');
// app.use(express.json());



app.use('/',homeroutes);



app.listen(PORT, () => {
    console.log('surver started on Port : ' + PORT)});