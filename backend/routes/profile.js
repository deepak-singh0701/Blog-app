const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {isLoggedIn} = require("../middleware");
const cloudinary = require("../utils/cloudinary");



router.get("/user/blogs" , isLoggedIn , async(req,res)=>{
    const myblog = await User.findById(req.user._id).populate("myblog");
    res.send(myblog.myblog);
})

router.post("/profile/edit" , isLoggedIn ,async (req,res)=>{
  if(req.user.public_id!== null || req.user.public_id!== null== undefined || req.user.public_id!== ""){
    await cloudinary.uploader.destroy(req.user.public_id).then((response)=>{
      console.log(response);
    })
    .catch((e)=>{
      console.log(e);
    })
  }
    console.log(req.user.public_id)
    await User.findByIdAndUpdate(req.user._id , {name:req.body.name , email:req.body.email , proimage:req.body.img_url , public_id:req.body.public_id })
    .then(()=>{
      res.send("success");
    })
    .catch(e=>{
      res.send("error");
    })
})

module.exports=router;