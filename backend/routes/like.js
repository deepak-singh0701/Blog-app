const express = require("express");
const { isLoggedIn } = require("../middleware");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");


router.post("/like" , isLoggedIn , async(req,res)=>{
    const blog = await Blog.findById(req.body.blogid);
    const likes = blog.likes+req.body.val;
    const foundBlog = await Blog.findByIdAndUpdate(req.body.blogid , {likes:likes});
    const user = await User.findById(req.user._id);
    user.likedBlogs.push(foundBlog);
    res.send("success");
});





module.exports= router;