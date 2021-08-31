const mongoose = require('mongoose');

var classSchema = new mongoose.Schema({
	subjectCode: String,
	subjectName: String,
	createdBy:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	students:[{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}],
	teachers: [{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}]
});

module.exports = mongoose.model("Class",classSchema);