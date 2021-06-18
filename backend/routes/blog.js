const express = require('express');
const mongoose = require('mongoose');
const { isLoggedIn } = require('../middleware');
const router = express.Router();
const Blog = require('../models/blog');
const User = require ("../models/user");


router.get('/blogs' ,async(req, res) => {
    const blogs=await Blog.find({});
    res.send(blogs);
})

router.post('/blogs',isLoggedIn, async (req, res) => {
    const blogBody={
        authorUsername:req.user.username,
        ...req.body
    }
    const blogdata = new Blog(blogBody);
    await req.user.myblog.push(blogdata);
    await blogdata.save();
    await req.user.save();
    res.send(blogdata);
})



router.get('/blogs/:id' ,isLoggedIn, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
})

router.get('/blogs/:id/edit',isLoggedIn, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
})

router.patch('/blogs/:id',isLoggedIn, async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.send(blog);
})

router.delete('/blogs/:id',isLoggedIn, async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.send(blog);
})

module.exports = router;

