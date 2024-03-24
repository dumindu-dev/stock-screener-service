const User = require("../models/user.model");
const crypto = require('crypto');

exports.authenticate = async (req, res) => {
	const currentUser = await User.find({userId:req.auth.userId});
	if(currentUser.length == 0){
		const randomToken = crypto.randomBytes(32).toString("hex");
		const newUser = new User({...req.auth,telegramToken:randomToken});
		await newUser.save();
	}
	res.send({success:1,description:"Authentication is successful"});
};