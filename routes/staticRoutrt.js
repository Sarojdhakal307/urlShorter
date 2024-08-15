const express = require('express');
const staticrouters = express();

const homeroutes = require('./urls');
const authRouter = require('./auth_user');


staticrouters.get('/', function(req, res) {
    res.redirect('/urls');
});
staticrouters.use('/urls',homeroutes);
staticrouters.use('/auth',authRouter);


module.exports = staticrouters;
