var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://farm4.staticflickr.com/3146/2980811752_4b0df9d215.jpg",
//     description: "This is a huge granite hill, no bathrooms. no water, beautiful granite."
// }, function(err, campground) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Newly added Campground");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7564/16034358725_fe2dde7f2e.jpg"},
//   {name: "Granite Hill", image: "https://farm4.staticflickr.com/3146/2980811752_4b0df9d215.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
//   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7564/16034358725_fe2dde7f2e.jpg"},
//   {name: "Granite Hill", image: "https://farm4.staticflickr.com/3146/2980811752_4b0df9d215.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
//   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7564/16034358725_fe2dde7f2e.jpg"},
//   {name: "Granite Hill", image: "https://farm4.staticflickr.com/3146/2980811752_4b0df9d215.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"}
//   ];

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
            res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new");
});

// this is the showpage route
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});