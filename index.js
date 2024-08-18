require('dotenv').config()

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const {connectMongodb } = require('./connection');

const cookies = require('cookie-parser');
app.use(cookies());

//connect Database
connectMongodb()
.then(()=> console.log('mongodb connection : successful'))
.catch(err => console.err(e));

const staticrouters = require('./routes/staticRoutrt');

app.use('/',staticrouters);

app.listen(PORT, () => {
    console.log('surver started on Port : ' + PORT)});