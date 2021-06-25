const mongoose = require ("mongoose");
const Blog = require ("./blog");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema =new mongoose.Schema({
    proimage:{
        type:String ,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    myblog:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }]
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User" , userSchema);

module.exports=User;