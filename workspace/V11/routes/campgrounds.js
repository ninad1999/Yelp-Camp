var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");

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
router.post("/", middleware.isLoggedIn, function(req, res) {
   var name = req.body.name;
   var price = req.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name:name, price: price, image:image, description: desc, author: author};
   Campground.create(newCampground, function(err, newAdded) {
       if (err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

// this route should show the route that will send the data to the post route
router.get("/new", middleware.isLoggedIn, function(req, res) {
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

// -------------EDIT----------------

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundcampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundcampground});
        }
    });
});

// -------------UPDATE--------------

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

// -------------DELETE---------------

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;