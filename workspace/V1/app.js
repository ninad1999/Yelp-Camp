var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7564/16034358725_fe2dde7f2e.jpg"},
   {name: "Granite Hill", image: "https://farm4.staticflickr.com/3146/2980811752_4b0df9d215.jpg"},
   {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7564/16034358725_fe2dde7f2e.jpg"},
   {name: "Granite Hill", image: "https://farm4.staticflickr.com/3146/2980811752_4b0df9d215.jpg"},
   {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
   {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7564/16034358725_fe2dde7f2e.jpg"},
   {name: "Granite Hill", image: "https://farm4.staticflickr.com/3146/2980811752_4b0df9d215.jpg"},
   {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"}
   ];

app.get("/", function(req, res) {
   res.render("landing");
});

// to diplay all the campgrounds
app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

// post route where you can create a new campgrounds
app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name:name, image:image};
   campgrounds.push(newCampground);
   
   res.redirect("/campgrounds");
});

// this route should show the route that will send the data to the post route
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});