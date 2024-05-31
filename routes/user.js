const express = require('express');
const userRoutes = express();

const render = require('ejs');
const path = require('path');

const shortID = require('shortid');
const userDb = require('../models/userDb');
const fs = require('fs');

userRoutes.use(express.json());
userRoutes.use(express.urlencoded({ extended: false }));

userRoutes.set('view engine', 'ejs') ;
userRoutes.set('views', path.resolve('./views'));


userRoutes.get('/', function(req, res) {
    console.log("inside signupGet");
    return res.status(400).render('signup', {
        message: ""
    });
});

userRoutes.post('/' , async (req,res) => {
    try {
        console.log("inside signupPost");
        const { fullname, email, password, confirmPassword } = req.body;
        console.log('body:', req.body);
        if (!fullname || !email || !password || !confirmPassword) {
            return res.status(400).render('signup', {
                message: 'Please enter all fields'
            });
        };
        if(password.length < 6)
            return res.status(400).render('signup', {
                message: 'Password should be atleast 6 characters long'
            });
        const checkExists  = await userDb.findOne({"email":email})
        if(checkExists){
            return res.status(400).render('signup', {
                message: 'User already exists'
            });            
        };
        if (password !== confirmPassword) {
            return res.status(400).render('signup', {
                message: 'Passwords do not match'
            });
        };
         const shortid = shortID.generate();

        // Create a new instance of the user model
        const newUser = new userDb({
            fullname,
            email,
            password,
            userid: shortid
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        return res.redirect('/login');

        
    } catch(error) {
        console.error("Error during signup post:", error);
        res.status(500).send("Internal Server Error");
    }
});
// });



module.exports = userRoutes;