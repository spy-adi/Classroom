const express 		 = require("express"),
	app 			 = express(),
	bodyParser       = require("body-parser"),
	path 			 = require("path"),
	mongoose 		 = require("mongoose"),
	passport 		 = require("passport"),
    session 		 = require('express-session'),
	LocalStrategy	 = require("passport-local"),
	User 			 = require("./models/userSchema"),
	indexRoutes	 	 = require("./routes/index"),
	port 			 = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/kaksha");

//setup
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//passport setup for local mongoose
app.use(require("express-session")({
	secret: "Secret Page",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
	res.locals.currentUser = req.user;
	// res.locals.error = req.flash("error");
	// res.locals.success = req.flash("success");
	next();
});

//routes setup
app.use(indexRoutes);

//server load
app.listen(port, function(){
	console.log("Server has started on port "+port);
});