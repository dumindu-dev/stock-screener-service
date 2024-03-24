const Site = require("../models/site.model")

exports.getLastPriceUpdateTime = async (req, res) => {
	const currentSite = await Site.findOne({siteName:"default-site"}, "-_id lastPriceUpdate");
	res.send(currentSite);
};