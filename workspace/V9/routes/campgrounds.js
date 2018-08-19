var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// to diplay all the campgrounds
router.get("/", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
            // req.user gives undefined when no user logged in, and gives a user object when user logged in
        }
    });
});

// post route where you can create a new campgrounds
router.post("/", isLoggedIn, function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name:name, image:image, description: desc, author: author};
   Campground.create(newCampground, function(err, newAdded) {
       if (err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

// this route should show the route that will send the data to the post route
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// this is the showpage route
router.get("/:id", function(req, res) {  // comments have been referenced to posts, hence to add them to the comments array, first populate them and execute
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) { // populating the comments array on the Campground collection
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        
        return next();
    }
    
    res.redirect("/login");
}

module.exports = router;