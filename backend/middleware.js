const User = require ("./models/user");



const isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        return res.send('loginfirst');
    }
    next();
}

const isVerified = async(req,res,next)=>{
    try{
        const user =await User.findOne({username:req.body.username});
        if(user==null || user ==undefined){
            res.send("nouser"); 
        }
        else{
            next();
        }
    }
    catch(e){
        console.log(e);
        res.send("nouser");
    }
};

module.exports = {
    isLoggedIn , isVerified
}

