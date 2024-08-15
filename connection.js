require('dotenv').config()
const mongoose = require('mongoose');
async function connectMongodb(){
mongoose.connect(process.env.DB_URL);
}
module.exports = {connectMongodb};