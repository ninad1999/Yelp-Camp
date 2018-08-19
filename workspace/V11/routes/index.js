var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res) {
   res.render("landing");
});


// ----------------SIGNUP----------------------

router.get("/register", function(req, res){
   res.render("./register");
});

// signup logic
router.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if (err) {
        //   console.log(err);
          req.flash("error", err.message);
          return res.render("./register"); // return so that if there is an wrror we can short circuit and break out of the function
      } else {
            passport.authenticate("local")(req, res, function() {
               req.flash("success", "Welcome to Yelpcamp " + user.username);
               res.redirect("/campgrounds");
            });
      } 
   });
});

// ------------LOGIN---------------

router.get("/login", function(req, res) {
   res.render("./login"); 
});

// app.post("/login, middleware, function()");
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

// --------------LOGOUT------------------

router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds"); 
});

// --------------MIDDLEWARE for accessing pages-------------
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        
        return next();
    }
    
    res.redirect("/login");
}

module.exports = router;

