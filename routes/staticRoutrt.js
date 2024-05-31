const express = require('express');
// const { router } = require('./user');
const staticrouters = express();


staticrouters.get('/', function(req, res) {
    res.redirect('http://localhost:4040/signup');
});

module.exports = staticrouters;
