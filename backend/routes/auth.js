const express = require("express");
const { isLoggedIn, isVerified } = require("../middleware");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { session } = require("passport");

router.post(
  "/login",
  isVerified,
  passport.authenticate("local", {
    failureRedirect: "/error",
  }),
  (req, res) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  const newUser = new User({
    proimage:"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
    name:req.body.name,
    email:req.body.email,
    username: req.body.username,
  });
  await User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      res.send("success");
    }
  });
});

router.get("/logout" , (req,res)=>{
  req.logout();
  res.send("success");
})
router.get("/isloggedin" , isLoggedIn , (req,res)=>{
  res.send(req.user);
})

router.get("/error/", (req, res) => {
  res.send("error");
});

module.exports = router;
