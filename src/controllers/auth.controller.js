const User = require("../models/user.model");

exports.authenticate = async (req, res) => {
	const currentUser = await User.find({userId:req.auth.userId});
	if(currentUser.length == 0){
		const newUser = new User(req.auth);
		await newUser.save();
	}
	res.send({success:1,description:"Authentication is successful"});
};