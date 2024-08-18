const sessionidtousermap = new Map();

function setUser(id,user){
    sessionidtousermap.set(id,user);
}
function getUser(id){
    return sessionidtousermap.get(id);
}
module.exports = { setUser, getUser };