const express = require("express");
const path = require("path");

const homeroutes = express();
const shortID = require("shortid");
const render = require("ejs");
const urlsDB = require("../models/urlsDB");
const userDb = require("../models/userDb");
const fs = require("fs");

const bodyParser = require("body-parser");
homeroutes.use(express.json());
homeroutes.use(express.urlencoded({ extended: false }));

homeroutes.set("view engine", "ejs");
homeroutes.set("views", path.resolve("./views"));

homeroutes.get("/", async (req, res) => {
  console.log("inside get");
  try{
  const _uid = req.cookies.uid;
  console.log(_uid)
  return res.render("form", {
    uid:{"uid": _uid}
  });
}catch(e){console.log("some thing wents wrong : "+e)}
});

homeroutes.post("/", async (req, res) => {
    try{
  console.log("inside post");
  const body = await req.body;
  console.log(req.originalUrl)
  console.log("userURL" + body.userUrl);
  const shortid = shortID.generate();
  const originalUrl = req.originalUrl;
  console.log("originalUrl : " + originalUrl);
  const urlsdata = new urlsDB({
    userUrl: body.userUrl,
    shortUrl: shortid,
    createdBy: req.user,
    displayshortUrl: `${req.protocol}://${req.get('host')}/urls/${shortid}`,
  });
  console.log("urlsdata : " + urlsdata);
  urlsdata.save().then((data) => {
    console.log("done" + data);
  });
  return res.render("form", {
    id: urlsdata,
  });
}catch(e){console.log(e);return}
});
homeroutes.get("/:shorturl", async (req, res) => {
  const shorturl = req.params.shorturl;
  try {
    // Search for the URL document in the database
    const urlDoc = await urlsDB.findOne({ shortUrl: shorturl });
    if (urlDoc) {
      urlDoc.visit++;
      console.log(
        `Associated long URL: ${urlDoc.userUrl} , clicks : ${urlDoc.visit}  `
      );
      res.redirect(urlDoc.userUrl); // Redirect to the long URL
    } else {
      console.log(`Short URL not found`);
      res.status(404).render("404Error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for URL' })
  }
});
module.exports = homeroutes;
