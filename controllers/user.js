const userDb = require('../models/userDb');



async function handleUserSignup(req,res){
    const {name,email,password} = req.body;

    await userDb.create({
        fullname,
        email,
        password
    })   
    
    return res.render("home");
}

module.exports = { handleUserSignup };