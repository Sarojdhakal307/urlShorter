const {getUser} = require('../service/auth');
async function onlylogin(req, res, next) {
    console.log(req.cookies);
    const userUid = req.cookies.uid;

    if(!userUid)  return res.redirect('/login');
    const user = getUser(userUid);

    if(!user) return res.redirect('/login');

    req.user = user;
    next();

}
module.exports = {onlylogin};




// const {getUser} = require('../service/auth');
// async function onlylogin(req, res, next){
//     const userId = req.cookies.uid;

//     if(!userId) return res.redirect("/login");

//     const user = getUser(userId);
//     console.log("User is : " + user);
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// module.exports = {onlylogin};