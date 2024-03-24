const View = require("../models/view.model")

exports.getViews = async (req, res) => {
	const views = await View.find({owner_id:req.auth.userId}, "-_id view_id view_name view_description stocks result performance");
	res.send(views);
};