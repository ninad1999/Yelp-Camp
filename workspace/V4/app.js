var express = require("express")
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js");
var seedDB = require("./seed");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

app.get("/", function(req, res) {
   res.render("landing");
});

// to diplay all the campgrounds
app.get("/campgrounds", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// post route where you can create a new campgrounds
app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name:name, image:image, description: desc};
   Campground.create(newCampground, function(err, newAdded) {
       if (err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

// this route should show the route that will send the data to the post route
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// this is the showpage route
app.get("/campgrounds/:id", function(req, res) {  // comments have been referenced to posts, hence to add them to the comments array, first populate them and execute
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) { // populating the comments array on the Campground collection
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// =====================
// COMMENT ROUTES
// =====================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
   // find campground by id
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          Comment.create(req.body.comment, function(err, comment) {
              if (err) {
                  console.log(err);
              } else {
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }
          })
      }
   });
   //create new comment
   // connect comment to campground
   // redirect campground show page
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});