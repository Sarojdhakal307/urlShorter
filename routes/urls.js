const express = require('express');
const homeroutes = express();
const shortID = require('shortid');
// const bodyParser = require('body-parser');
const urlsDB = require('../models/urlsDB');
const fs = require('fs');

const bodyParser = require('body-parser');
homeroutes.use(express.json());
homeroutes.use(bodyParser.json());
homeroutes.use(express.urlencoded({ extended: true }));

homeroutes.get('/' , (req,res) => {
    res.send('Welcome to URL Shortner');
});

homeroutes.post('/' , async (req,res) => {
    const body = await req.body;
    console.log('userURL' + body.userUrl);
    const shortid = shortID.generate();
    const originalUrl = req.originalUrl;
    console.log('originalUrl : ' + originalUrl);
    const urlsdata = new urlsDB({
        userUrl: body.userUrl,
        shortUrl: shortid,
        displayshortUrl: 'http://localhost:4040/' + shortid
    });
   urlsdata.save().then((data) => {
       console.log('done' + data);});
   res.end("searching Url : " + urlsdata.displayshortUrl);
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
            res.status(404).json({ message: 'Short URL not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching for URL' });
    }
});


module.exports = homeroutes;

