const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {isLoggedIn} = require("../middleware");




router.get("/user/blogs" , isLoggedIn , async(req,res)=>{
    const myblog = await User.findById(req.user._id).populate("myblog");
    res.send(myblog.myblog);
})

router.post("/profile/edit" , isLoggedIn ,async (req,res)=>{
    console.log("idhr aaya apnum");
    await User.findByIdAndUpdate(req.user._id , {name:req.body.name , email:req.body.email});

    res.send("success");
})




module.exports=router;