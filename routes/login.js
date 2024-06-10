const express = require('express');
const loginRoutes = express();

const { v4: uuidv4 } = require('uuid');
const {setUser } = require("../service/auth")

const render = require('ejs');
const path = require('path');

loginRoutes.use(express.json());
loginRoutes.use(express.urlencoded({ extended: false }));

loginRoutes.set('view engine', 'ejs') ;
loginRoutes.set('views', path.resolve('./views'));

const userDb = require('../models/userDb');

loginRoutes.get('/', function(req, res) {
    console.log("inside loginGet");
   return res.render("login", {
    message: ""
   });
});

loginRoutes.post('/', async function(req, res) {
    console.log("inside loginPost");
    const { email, password } = req.body;
    console.log('body:', req.body);

    const user = await userDb.findOne({ 'email': email});
    
    if (!user) {
        return res.status(400).render('login', {
            message: 'Invalid User'
        });}
        console.log("User : "+ user.email + " Password : " + user.password);
    if( user.password != password){
            return res.render('login',{
                message: 'Invalid password'
             });
        }
    if(user.email === email && user.password === password){
        const SessionId = uuidv4();
        setUser(SessionId,user);
        res.cookie("uid",SessionId);
        return res.redirect('/urls');
    }
});
module.exports = loginRoutes;