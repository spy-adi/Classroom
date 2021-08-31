const mongoose 		  		= require("mongoose"),
	  passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	fName : String,
	lName : String,
	username : String,
	email : String,
	password: String,
	class:[{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Class"
		},
		subjectCode: String,
		subjectName: String
	}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);