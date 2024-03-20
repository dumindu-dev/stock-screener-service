const View = require("../models/view.model")

exports.getViews = async (req, res) => {
	const views = await View.find({owner_id:req.auth.userId});
	res.send(views);
};