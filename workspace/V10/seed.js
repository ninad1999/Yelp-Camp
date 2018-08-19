var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "cloud's rest",
            image: "http://www.thatsnotcamping.com/wp-content/uploads/2012/08/Paradise-Campground.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Granite hill",
            image: "http://www.oceancove.org/images/ca11129.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Canyon Mountain",
            image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
