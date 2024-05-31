const express = require('express');
const path = require('path');

const homeroutes = express();
const shortID = require('shortid');
const render = require('ejs');
// const bodyParser = require('body-parser');
const urlsDB = require('../models/urlsDB');
// const userDb = require('../models/userDb');
const fs = require('fs');

const bodyParser = require('body-parser');
homeroutes.use(express.json());
homeroutes.use(express.urlencoded({ extended: false }));
// homeroutes.use(bodyParser.json());
// homeroutes.use(express.urlencoded({ extended: true }));

// homeroutes.set('views', path.join(__dirname, 'views'));
homeroutes.set('view engine', 'ejs') ;
homeroutes.set('views', path.resolve('./views'));

// homeroutes.get('/' , async (req,res) => {
//    console.log('inside get');
// //    res.send("I am inside get")
//     const allurls =  await urlsDB.find({});
//     // console.log("All Urls : " + allurls);
//     return res.render('index' , { 
//         urls : allurls,
//     });
// });


homeroutes.get('/' , async (req,res) => {
    console.log('inside get');
 //    res.send("I am inside get")
    //  const allurls =  await urlsDB.find({});
     // console.log("All Urls : " + allurls);
     return res.render('form' , { 
        //  urls : allurls,
     });
 });

homeroutes.post('/' , async (req,res) => {
    console.log('inside post');
    const body = await req.body;
    console.log('userURL' + body.userUrl);
    const shortid = shortID.generate();
    const originalUrl = req.originalUrl;
    console.log('originalUrl : ' + originalUrl);
    const urlsdata = new urlsDB({
        userUrl: body.userUrl,
        shortUrl: shortid,
        displayshortUrl: 'http://localhost:4040/urls/' + shortid
    });
   urlsdata.save().then((data) => {
       console.log('done' + data);});
       return res.render('form',{
        id: urlsdata,
       })
//    res.end("searching Url : " + urlsdata.displayshortUrl);
});

homeroutes.get('/:shorturl' , async (req,res) => {
    const shorturl = req.params.shorturl;
    try {
        // Search for the URL document in the database
        const urlDoc = await urlsDB.findOne({ "shortUrl": shorturl });

        if (urlDoc) {
            console.log(`Associated long URL: ${urlDoc.userUrl}`);
            res.redirect(urlDoc.userUrl); // Redirect to the long URL
        } else {
            console.log(`Short URL not found`);
        res.status(404).render('404Error');

            // res.status(404).json({ message: 'Short URL not found' });
        }
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Error searching for URL' })
        // res.status(404).render('404Error');
}});


module.exports = homeroutes;

