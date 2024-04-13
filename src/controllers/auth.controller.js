const User = require("../models/user.model");
const crypto = require('crypto');
const Stats = require("../utils/Stats");

exports.authenticate = async (req, res) => {
	const currentUser = await User.find({userId:req.auth.userId});
	if(currentUser.length == 0){
		const randomToken = crypto.randomBytes(32).toString("hex");
		const newUser = new User({...req.auth,telegramToken:"tk"+randomToken});
		await newUser.save();
	}

	try{
		Stats.logActiveUsers(req.auth.userId);
	}catch(err){
		console.log("IGNORE: Error occured updating active users");
	}

	res.send({success:1,description:"Authentication is successful"});
};