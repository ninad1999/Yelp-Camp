var express = require("express");
var router = express.Router({mergeParams: true}); // {mergeParams: true} cuz :id is in app.js file in /campgrounds/:id/comments, to get it to this file so that findById() works
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn,  function(req, res) {
    // find campground
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

router.post("/", isLoggedIn, function(req, res) {
   // find campground by id
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          
          //create new comment
          Comment.create(req.body.comment, function(err, comment) {
              if (err) {
                  console.log(err);
              } else {
                  // add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  
                  // save comment
                  comment.save();
                  
                  // connect comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  
                  // redirect campground show page
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
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