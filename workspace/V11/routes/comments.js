var express = require("express");
var router = express.Router({mergeParams: true}); // {mergeParams: true} cuz :id is in app.js file in /campgrounds/:id/comments, to get it to this file so that findById() works
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

router.get("/new", middleware.isLoggedIn,  function(req, res) {
    // find campground
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
   // find campground by id
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          
          //create new comment
          Comment.create(req.body.comment, function(err, comment) {
              if (err) {
                  req.flash("error", "Something went wrong")
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
                  req.flash("success", "Successfully added comment!")
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
   });
});

// --------------EDIT------------
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if (err) {
          console.log(err);
          res.redirect("back");
      } else {
          res.render("comments/edit", {campground_id: req.params.id, comment: comment});
      }
  });
});

// ---------------UPDATE------------
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// --------------DELETE----------------

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment) {
        if (err) {
            req.flash("Something went wrong");
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



module.exports = router;