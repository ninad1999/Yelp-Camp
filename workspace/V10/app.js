var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground.js"),
    Comment         = require("./models/comment.js"),
    User            = require("./models/user.js"),
    seedDB          = require("./seed"),
    methodOverride  = require("method-override");
    
var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// console.log(__dirname); // __dirname: /home/ubuntu/workspace/V5
app.set("view engine", "ejs");
// seedDB(); // seed the databse

// ---------------------PASSPORT CONFIGURATIONS--------------------
app.use(require("express-session")({
    secret: "This can literally be anything",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --------Middleware for deciding when to dispaly login, signup (when user not logged in) and logout(when user logged in) buttons ------------
app.use(function(req, res, next) {
    res.locals.currentUser = req.user; // this will pass the user to every single template
    next();
});

// ---------ROUTES----------------
app.use("/campgrounds", campgroundRoutes);  //adding /campgrounds here will append it to every route in campgroundRoutes eg: /new will become /campgrounds/new
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started!");
});