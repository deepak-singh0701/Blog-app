const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("./models/user");

// Routes 

const blogRoutes = require('./routes/blog');
const authRoutes = require ('./routes/auth');
const profileRoutes = require("./routes/profile");


mongoose.connect('mongodb://localhost:27017/ng-blog-app',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("DB NOT CONNECTED");
        console.log(err)
    })
    
    
const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true
}


app.use(session(sessionConfig));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// configuring the passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB();
app.use(authRoutes);
app.use(blogRoutes);
app.use(profileRoutes);


app.listen(8080, () => {
    console.log("Server runnig at port 8080");
})