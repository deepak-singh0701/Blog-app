const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    authorUsername:{
        type:String,
        required:true
    },
    author: {
        type: String,
        required:true
    },
    img:{
        type: String,   
    },
    content: {
        type:String,
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    likes:{
        type:Number , 
        default:0
    }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;