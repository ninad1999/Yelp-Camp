var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "cloud's rest",
            image: "https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104496f3c47ea4e4b5b0_340.jpg",
            description: "blah blah blah blah"
        },
        {
            name: "Granite hill",
            image: "https://pixabay.com/get/eb30b00d21f0053ed1584d05fb1d4e97e07ee3d21cac104496f3c47ea4e4b5b0_340.jpg",
            description: "blah blah blah blah"
        },
        {
            name: "Canyon Mountain",
            image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
            description: "blah blah blah blah"
        }
        ];

function seedDB() {
    
    // remove campgrounds
    Campground.remove({}, function(err) {
       if (err) {
           console.log(err);
       } else {
           console.log("removed campgrounds!");
           
           // add campgrounds
           data.forEach(function(seed) {
               Campground.create(seed, function(err, campground) {
                   if (err) {
                       console.log(err);
                   } else {
                       console.log("added campground");
                       
                       // add comments
                       Comment.create({
                           text: "this place is great, but i wish it had internet",
                           author: "Homer"
                       }, function(err, comment) {
                           if (err) {
                               console.log(err);
                           } else {
                              campground.comments.push(comment);
                              campground.save();
                              console.log("created a comment");
                           }
                       });
                   }
               });
           });
       }
    });
}

module.exports = seedDB;
