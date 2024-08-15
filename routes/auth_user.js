const express = require('express');
const authRouter = express();

const path = require('path');
authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: false }));

authRouter.set('view engine', 'ejs') ;
authRouter.set('views', path.resolve('./views'));

const {loginhandlear,signuphandlear} = require('./handlers/handler')

authRouter.get('/login', function(req, res) {
    console.log("inside loginGet");
   return res.render("login", {
    message: ""
   });
});
authRouter.post('/login', loginhandlear);

authRouter.get('/signup', function(req, res) {
    console.log("inside signupGet");
    return res.status(400).render('signup', {
        message: ""
    });
});
authRouter.post('/signup', signuphandlear);

module.exports = authRouter;