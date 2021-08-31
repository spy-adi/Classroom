const express 	= require("express"),
	  router  	= express.Router(),
	  passport  = require("passport"),
	  User 		= require("../models/userSchema"),
	  Class 		= require("../models/classSchema");

//landing
router.get("/", (req,res)=> {
		res.render("landing");
	});

//register
router.get("/register", (req,res)=>{
	res.render("register");
});

router.post("/register",function(req,res){
	
	var newUser = new User({
	fName : req.body.firstname,
	lName : req.body.lastname,
	username : req.body.username,
	email : req.body.email,
	// class : newclass
	});
	User.register(newUser,req.body.password, function(err,user){
		if(err){
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/user/"+user._id);
		})
	})
});

//login
router.get("/login", (req,res)=>{
	res.render("login");
});

router.post('/login', function(req, res, next) {
      passport.authenticate('local', {failureFlash:true}, function(err, user, info) {
       if (err) { return next(err); }
       if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
       return res.redirect('/user/' + user._id);
     });
    })(req, res, next);
    });

//logout
router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/");
});

//user
router.get("/user/:id", function(req,res){
	User.findById(req.params.id, function(err,foundUser){
		res.render("homePage",{user: foundUser});
	})
	
})

//create class
router.get("/user/:id/create", function(req,res){
	res.render("createClass",{id: req.params.id});
})

router.post("/user/:id/create", function(req,res){
		User.findById(req.params.id, function(err,user){
			if(err){

			}
			else{
				Class.create({
					subjectCode: req.body.subject.Code,
					subjectName: req.body.subject.Name,
					createdBy: {
						id: user._id,
						username: user.username
					}
				}, function(err, cl){
					if(err){

					}
					else{
						user.class.push(cl);
						user.save();
						res.redirect("/user/"+user._id);
					}
				})
			}
		})
})

//allclassrooms
router.get("/classrooms",function(req,res){
	Class.find({},function(err,cl){
		if(err){

		}
		else{
			res.render("allClassrooms",{cl:cl});
		}
	})
	
})

router.get("/classrooms/:subjectCode", function(req,res){
	Class.findOne({subjectCode: req.params.subjectCode}, function(err,cl){
		res.render("subject",{cl:cl});
	})
})
module.exports = router;