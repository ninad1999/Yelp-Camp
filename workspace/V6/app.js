var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground.js"),
    Comment         = require("./models/comment.js"),
    User            = require("./models/user.js"),
    seedDB          = require("./seed");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// console.log(__dirname); // __dirname: /home/ubuntu/workspace/V5
app.set("view engine", "ejs");
seedDB();

// ---------------------PASSPORT CONFIGURATIONS--------------------
app.use(require("express-session")({
    secret: "This can literally be anything",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --------Middleware for deciding when to dispaly login, signup (when user not logged in) and logout(when user logged in) buttons ------------
app.use(function(req, res, next) {
    res.locals.currentUser = req.user; // this will pass the user to every single template
    next();
})

// ================================
// ROUTES
// ===============================

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
            // req.user gives undefined when no user logged in, and gives a user object when user logged in
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

app.get("/campgrounds/:id/comments/new", isLoggedIn,  function(req, res) {
    // find campground
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
                  
                  // connect comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  
                  // redirect campground show page
                  res.redirect("/campgrounds/" + campground._id);
              }
          })
      }
   });
});

// =======================
// AUTH ROUTES
// =======================

// ----------------SIGNUP----------------------

app.get("/register", function(req, res){
   res.render("./register") 
});

// signup logic
app.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if (err) {
          console.log(err);
          return res.render("./register") // return so that if there is an wrror we can short circuit and break out of the function
      } else {
            passport.authenticate("local")(req, res, function() {
               res.redirect("/campgrounds");
            });
      } 
   });
});

// ------------LOGIN---------------

app.get("/login", function(req, res) {
   res.render("./login"); 
});

// app.post("/login, middleware, function()");
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

// --------------LOGOUT------------------

app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds"); 
});

// --------------MIDDLEWARE for accessing pages-------------
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        
        return next();
    }
    
    res.redirect("/login");
}




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});