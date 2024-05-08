const mongoose = require('mongoose');

async function connectMongodb(url){
mongoose.connect(url);
}

module.exports = {connectMongodb};